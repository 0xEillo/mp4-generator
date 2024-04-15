# mp4-generator

## requirements

have ffmpeg installed.

On Windows: Download the ffmpeg binaries from the official website (https://ffmpeg.org) and add the ffmpeg directory to your system's PATH environment variable.
On macOS: You can install ffmpeg using Homebrew by running brew install ffmpeg in the terminal.

## generating mp4s

- audios-storage folder is for storing .zip folders of audios
- images folder is for storing the images that will be changed to mp4s
- audios folder is for storing the audios that will be changed to mp4s

the generation randomly associates audios to images to create the mp4s in the output folder.

to install dependencies:

```
pnpm install
```

to run the generation:

```
pnpm run generate
```
