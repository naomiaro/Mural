import React from 'react';
import { observer } from 'mobx-react';
import { Fieldset, Legend, Label } from '@bootstrap-styled/v4';

import VideoPreviewField from './bites/VideoPreviewField';
import Alignment from './bites/Alignment';

import {
  Title,
  Subtitle,
  Body,
  NavEntry,
  ButtonPanel,
} from './bites';

function VideoBackgroundForm({ draftItem, onSave }) {
  return (
    <>
      <NavEntry />
      <Fieldset>
        <Legend>Item Content</Legend>
        <Alignment
          value={draftItem.align}
          changeAlignment={draftItem.changeAlignment}
          uuid={draftItem.id}
        />
        <Title
          title={draftItem.title}
          changeTitle={draftItem.changeTitle}
        />
        <Subtitle
          subtitle={draftItem.subtitle}
          changeSubtitle={draftItem.changeSubtitle}
        />
        <Body
          body={draftItem.body}
          changeBody={draftItem.changeBody}
        />
      </Fieldset>
      <Fieldset>
        <Label>Background Video</Label>
        <VideoPreviewField video={draftItem.video} />
      </Fieldset>
      <ButtonPanel onSave={onSave} />
    </>
  );
}

export default observer(VideoBackgroundForm);