import os

start = "00:00:34"
duration = "00:00:24"

os.system(f"ffmpeg -i input.mp4 -ss {start} -t {duration} -c copy output3.mp4")