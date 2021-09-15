import { Box, Typography } from '@material-ui/core'
import Input from 'components/StoryForm/Input'
import Image from 'components/StoryForm/Image'

export default function StoryMetadataForm() {
  return (
    <>
      <Typography variant="h2">Story Metadata</Typography>
      <form>
        <Box my={4}>
          <Input
            name="metadata.title"
            label="Title"
            autoFocus
            helperText={
              <>
                The title metadata field is also responsible for the og (Open
                Graph) og:title property which is used by social media platforms
                such as Facebook and Twitter.
              </>
            }
            rules={{ required: true }}
          />
        </Box>
        <Box my={4}>
          <Input
            name="metadata.description"
            label="Description"
            helperText={
              <>
                The description metadata field is where you should describe your
                Mural story in between 120 to 158 characters. This length may
                seem arbitrary (and in some ways it is) - but this is ideal
                length of a string of text when displayed by search engines
                likesuch as Google or Duck Duck Go and Social media platforms
                such as Facebook, Twitter, or Mastodon.
                <br />
                The description metadata field is also responsible for the
                og:description output in your final Mural story.
              </>
            }
            rules={{ maxLength: 158, minLength: 120 }}
          />
        </Box>
        <Box my={4}>
          <Input
            name="metadata.author"
            label="Author"
            placeholder="Your name"
            helperText={
              <>
                The author field is where the author of the Mural story's name
                is entered.
              </>
            }
          />
        </Box>
        <Box my={4}>
          <Input
            name="metadata.canonicalUrl"
            label="Canonical URL"
            placeholder="https://your-website.com"
            helperText={
              <>
                If you know the final website address of your Mural story then
                this is where to enter that information.
              </>
            }
          />
        </Box>
        <Box my={4}>
          <Input
            name="metadata.siteName"
            label="Site Name"
            helperText={
              <>
                What is the name of your Mural story? Although they are often
                the same this does not have to be identical to the title
                metadata information.
              </>
            }
          />
        </Box>
        <Box my={4}>
          <Image
            name="metadata.siteImage"
            label="Site Image"
            helperText={
              <>
                This is where you should upload an image to represent your Mural
                story when it is displayed on social media platforms such as
                Facebook, Twitter, or Mastodon.
              </>
            }
          />
        </Box>
        <Box my={4}>
          <Input
            name="metadata.googleAnalyticsId"
            label="Google Analytics ID"
          />
        </Box>
        <Box my={4}>
          <Input name="metadata.rssPingbkack" label="RSS pingbkack" />
        </Box>
      </form>
    </>
  )
}