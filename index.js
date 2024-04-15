const ffmpeg = require('fluent-ffmpeg')
const fs = require('fs')
const path = require('path')

const imagesFolder = './images' // Path to the folder with images
const audiosFolder = './audios' // Path to the folder with .wav files
const outputFolder = './output' // Path to the output folder

if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder, { recursive: true })
}

const getImageFiles = () =>
  fs
    .readdirSync(imagesFolder)
    .filter((file) => file.endsWith('.png') || file.endsWith('.png'))
const getAudioFiles = () =>
  fs.readdirSync(audiosFolder).filter((file) => file.endsWith('.wav')) // or '.mp4' if necessary

const combineRandomImageWithAudio = () => {
  const images = getImageFiles()
  const audios = getAudioFiles()

  if (images.length === 0 || audios.length === 0) {
    console.error('Images or audios folder is empty.')
    return
  }

  // Shuffle the images array
  const shuffledImages = images.sort(() => Math.random() - 0.5)

  // For each image, pick a random audio and combine
  shuffledImages.forEach((image) => {
    const randomAudio = audios[Math.floor(Math.random() * audios.length)]
    const outputPath = path.join(outputFolder, `${path.parse(image).name}.mp4`)

    ffmpeg()
      .addInput(path.join(imagesFolder, image))
      .loop() // Loop the image
      .input(path.join(audiosFolder, randomAudio))
      .audioCodec('copy') // Use the same audio codec
      .videoCodec('libx264') // Use the libx264 codec for the video
      .outputOptions('-shortest') // Ensures the output duration matches the audio duration
      .on('error', (err) => console.error(`Error: ${err.message}`))
      .on('end', () => console.log(`Output generated: ${outputPath}`))
      .save(outputPath)
  })
}

combineRandomImageWithAudio()
