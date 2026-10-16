import os
import math
import subprocess
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
import imageio_ffmpeg

def create_preview_video(
    source_image_path: str,
    output_video_path: str,
    fps: int = 30,
    duration_sec: float = 6.0,
    target_width: int = 1920,
    target_height: int = 1080,
    zoom_max: float = 1.12,
    pan_x_max: float = 0.04,
    pan_y_max: float = 0.03,
    accent_rgb: tuple = (56, 189, 248),
    sheen_alpha: int = 35
):
    print(f"\n--- Generating {output_video_path} from {source_image_path} ---")
    source_img = Image.open(source_image_path).convert("RGBA")
    src_w, src_h = source_img.size

    total_frames = int(fps * duration_sec)
    ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()

    # Pre-render a rotating / angled sheen strip
    strip_w = 400
    strip_h = target_height * 2
    u = np.linspace(-1, 1, strip_w)
    alpha_curve = (sheen_alpha * np.exp(-3.5 * (u ** 2))).astype(np.uint8)
    arr = np.zeros((strip_h, strip_w, 4), dtype=np.uint8)
    arr[:, :, 0] = accent_rgb[0]
    arr[:, :, 1] = accent_rgb[1]
    arr[:, :, 2] = accent_rgb[2]
    arr[:, :, 3] = alpha_curve[None, :]
    strip_canvas = Image.fromarray(arr, "RGBA")

    # Rotate strip by 25 degrees
    sheen_beam = strip_canvas.rotate(25, resample=Image.Resampling.BILINEAR, expand=True)
    beam_w, beam_h = sheen_beam.size

    ffmpeg_cmd = [
        ffmpeg_exe,
        "-y",
        "-f", "rawvideo",
        "-vcodec", "rawvideo",
        "-s", f"{target_width}x{target_height}",
        "-pix_fmt", "rgba",
        "-r", str(fps),
        "-i", "-",
        "-c:v", "libx264",
        "-pix_fmt", "yuv420p",
        "-preset", "veryfast",
        "-crf", "18",
        "-movflags", "+faststart",
        output_video_path
    ]

    # Use stderr=subprocess.DEVNULL to prevent pipe deadlock
    proc = subprocess.Popen(ffmpeg_cmd, stdin=subprocess.PIPE, stderr=subprocess.DEVNULL)

    total_travel = target_width + beam_w + 300

    for frame_idx in range(total_frames):
        t = frame_idx / total_frames
        
        # Smooth cycle curve: 0 at start, 1 at midpoint, 0 at end
        cycle = (1.0 - math.cos(2.0 * math.pi * t)) / 2.0
        
        current_zoom = 1.0 + (zoom_max - 1.0) * cycle
        pan_x = math.sin(2.0 * math.pi * t) * (pan_x_max * src_w)
        pan_y = -math.sin(math.pi * t) * (pan_y_max * src_h)

        crop_w = src_w / current_zoom
        crop_h = src_h / current_zoom
        center_x = (src_w / 2.0) + pan_x
        center_y = (src_h / 2.0) + pan_y

        left = max(0, min(src_w - crop_w, center_x - crop_w / 2.0))
        top = max(0, min(src_h - crop_h, center_y - crop_h / 2.0))
        right = left + crop_w
        bottom = top + crop_h

        cropped = source_img.crop((int(left), int(top), int(right), int(bottom)))
        frame_base = cropped.resize((target_width, target_height), Image.Resampling.BILINEAR)

        # Paste the moving sheen beam
        beam_x = int(-beam_w + total_travel * t)
        beam_y = int((target_height - beam_h) / 2)

        # Composite beam with mask
        frame_base.paste(sheen_beam, (beam_x, beam_y), mask=sheen_beam)

        proc.stdin.write(frame_base.tobytes())

        if (frame_idx + 1) % 45 == 0 or frame_idx == total_frames - 1:
            print(f"Rendered {frame_idx + 1}/{total_frames} frames ({int((frame_idx + 1)/total_frames*100)}%)")

    proc.stdin.close()
    proc.wait()

    if proc.returncode != 0:
        raise RuntimeError(f"FFmpeg failed with exit code {proc.returncode}")

    size_mb = os.path.getsize(output_video_path) / (1024 * 1024)
    print(f"Created {output_video_path} successfully ({size_mb:.2f} MB)")

if __name__ == "__main__":
    os.makedirs("public/assets", exist_ok=True)
    
    # 1. HRKita Video (Enterprise Cyan / Emerald Sheen)
    create_preview_video(
        source_image_path="public/assets/hrkita_thumb.png",
        output_video_path="public/assets/preview_hrkita.mp4",
        fps=30,
        duration_sec=6.0,
        target_width=1920,
        target_height=1080,
        zoom_max=1.12,
        pan_x_max=0.04,
        pan_y_max=0.03,
        accent_rgb=(56, 189, 248),
        sheen_alpha=40
    )

    # 2. Seradia Video (Warm Luxury Champagne Gold Sheen)
    create_preview_video(
        source_image_path="public/assets/thumb_seradia.png",
        output_video_path="public/assets/preview_seradia.mp4",
        fps=30,
        duration_sec=6.0,
        target_width=1920,
        target_height=1080,
        zoom_max=1.14,
        pan_x_max=0.05,
        pan_y_max=0.035,
        accent_rgb=(212, 175, 55),
        sheen_alpha=45
    )
