module.exports = async (bot, queue, track) => {

    await queue.metadata.message.channel.send(`La musique ${track.title} est lancée`)
}