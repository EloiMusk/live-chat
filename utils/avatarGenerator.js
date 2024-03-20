async function generateAvatar(username) {
  try {
    const { createAvatar } = await import('@dicebear/avatars');
    const { botttsNeutral } = await import('@dicebear/collection');
    const avatar = createAvatar(botttsNeutral, {
      seed: username,
      dataUri: true
    });
    console.log("Avatar generated successfully.");
    return avatar;
  } catch (error) {
    console.error('Error generating avatar:', error.message, error.stack);
    throw error;
  }
}

module.exports = { generateAvatar };