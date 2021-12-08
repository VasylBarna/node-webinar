const { Storage } = require('@google-cloud/storage')

const storage = new Storage()
const bucketName = 'goit-26-test'

// Загрузить файл
// const filePath = './tmp/dog_team.png'
// const destFileName = 'doges_team.jpg'
// async function launchDemo() {
//   await storage.bucket(bucketName).upload(filePath, {
//     destination: destFileName,
//   })

//   console.log(`${filePath} uploaded to ${bucketName}`)
// }
// launchDemo().catch(console.error)

// скачать файл
const downloadFilePath = 'doges_team.jpg'
const downloadDestFileName = './tmp/dowload_doges_team.jpg'

async function launchDemo() {
  await storage
    .bucket(bucketName)
    .file(downloadFilePath)
    .download({ destination: downloadDestFileName })

  console.log(
    `gs://${bucketName}/${downloadFilePath} downloaded to ${downloadDestFileName}.`
  )
}

launchDemo().catch(console.error)
