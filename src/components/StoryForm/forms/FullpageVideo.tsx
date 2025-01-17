import { Box, Divider } from '@mui/material'
import Input from 'components/StoryForm/Input'
import Checkbox from '../Checkbox'
import Image from '../Image'
import Video from '../Video'
import Wysiwyg from '../Wysiwyg'
import OffsetPortraitVideo from '../OffsetPortraitVideo'

interface Props {
  itemIndex: number
}

export default function FullpageVideo({ itemIndex }: Props) {
  return (
    <>
      <Box my={4}>
        <Video
          key={`items.${itemIndex}.video`}
          name={`items.${itemIndex}.video` as const}
          label="Video"
        />
      </Box>
      <Box my={4}>
        <Checkbox
          key={`items.${itemIndex}.loopVideo`}
          name={`items.${itemIndex}.loopVideo` as const}
          label="Loop Video"
        />
      </Box>
      <Box my={4}>
        <Checkbox
          key={`items.${itemIndex}.autoAdvance`}
          name={`items.${itemIndex}.autoAdvance` as const}
          label="Auto-advance"
        />
      </Box>
      <Divider light />
      <Box my={4}>
        <Wysiwyg
          key={`items.${itemIndex}.title`}
          name={`items.${itemIndex}.title` as const}
          label="Title"
          placeholder="Your text here"
        />
      </Box>
      <Box my={4}>
        <Wysiwyg
          key={`items.${itemIndex}.text`}
          name={`items.${itemIndex}.text` as const}
          label="Text"
          placeholder="Your text here"
        />
      </Box>
      <Divider light />
      <Box my={4}>
        <Image
          key={`items.${itemIndex}.representativeImage`}
          name={`items.${itemIndex}.representativeImage` as const}
          label="Backup Image"
        />
      </Box>
      <Box my={4}>
        <Input
          key={`items.${itemIndex}.navigationTitle`}
          name={`items.${itemIndex}.navigationTitle` as const}
          label="Navigation Title"
        />
      </Box>
      <Box my={4}>
        <Input
          key={`items.${itemIndex}.imageAltText`}
          name={`items.${itemIndex}.imageAltText` as const}
          label="Image Alt Text"
        />
      </Box>
      <Divider light />
      <Box my={4}>
        <OffsetPortraitVideo
          key={`items.${itemIndex}.offsetPortraitVideo`}
          name={`items.${itemIndex}.offsetPortraitVideo` as const}
          label="Offset Portrait Video"
        />
      </Box>
    </>
  )
}
