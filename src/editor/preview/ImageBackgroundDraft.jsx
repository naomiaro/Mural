/* eslint-disable react/no-danger */
import React from 'react';
import { string, shape } from 'prop-types';
import { observer } from 'mobx-react';
import styled from 'styled-components';

const BackgroundImage = styled.div`
  position: fixed;

  ${(props) => props.srcImages.map(
      (rendition) => `
    @media only screen and (min-resolution: ${rendition.scale}dppx) and (min-width: ${rendition.w}px) {
      background-image: url(${rendition.thumborUrl});
    }
  `,
    )}
`;

function ImageBackgroundDraft(props) {
  const {
    item: {
      title,
      subtitle,
      body,
      image: { preview, renditions },
    },
  } = props;
  return (
    <section className="part sticky-image" name="story-id">
      <BackgroundImage className="bg-image" srcImages={renditions} />
      <div className="content container-fluid">
        <div className="row">
          <div className="col-sm-12 header-fullpage">
            <div className="middle">
              <h1 dangerouslySetInnerHTML={{ __html: title }} />
              <h2 dangerouslySetInnerHTML={{ __html: subtitle }} />
            </div>
          </div>
        </div>
        <div className="row">
          <div
            className="col-xs-12 col-sm-10 col-md-8 col-lg-6 text"
            dangerouslySetInnerHTML={{ __html: body }}
          />
        </div>
      </div>
    </section>
  );
}

ImageBackgroundDraft.propTypes = {
  item: shape({
    title: string,
    subtitle: string,
    body: string,
    image: shape({
      preview: string,
      path: string,
    }),
  }),
};

ImageBackgroundDraft.defaultProps = {
  item: {
    title: '',
    subtitle: '',
    body: '',
    image: { preview: '', path: '' },
  },
};

export default observer(ImageBackgroundDraft);
