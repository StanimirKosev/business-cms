/**
 * Trigger GitHub Actions workflow to rebuild website
 * Called automatically after successful database updates
 */
export async function triggerWebsiteRebuild() {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${process.env.GITHUB_REPO}/actions/workflows/deploy-website.yml/dispatches`,
      {
        method: 'POST',
        headers: {
          'Authorization': `token ${process.env.GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
        },
        body: JSON.stringify({
          ref: 'main',
        }),
      }
    );

    if (!response.ok) {
      console.error('Failed to trigger website rebuild:', response.statusText);
      return false;
    }

    console.log('✅ Website rebuild triggered');
    return true;
  } catch (error) {
    console.error('Error triggering website rebuild:', error);
    return false;
  }
}
