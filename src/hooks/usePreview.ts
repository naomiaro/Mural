import React from 'react'
import convertToHtml from 'utils/convertToHtml'
import { useAppSelector } from 'store/hooks'
import { Items, Storyboard } from '../../electron/exportFrontend'
import { nanoid } from '@reduxjs/toolkit'
import flatMap from 'lodash/flatMap'

const render = (state: Storyboard) => {
  window.electron.renderPreview(state)
}

const absMedia = (url: string, relativePath: string) => {
  return url + '/media/' + relativePath
}

const media = (relativePath: string) => {
  return absMedia('.', relativePath)
}

const encrypt = (text: string, shift: number) => {
  var result = ''
  for (var i = 0; i < text.length; i++) {
    var c = text.charCodeAt(i)
    if (c >= 65 && c <= 90) {
      result += String.fromCharCode(((c - 65 + shift) % 26) + 65)
    } else if (c >= 97 && c <= 122) {
      result += String.fromCharCode(((c - 97 + shift) % 26) + 97)
    } else {
      result += text.charAt(i)
    }
  }
  return result
}

export default function usePreview() {
  const state = useAppSelector((state) => state)
  const mappedState = React.useMemo(() => {
    const rotationalValue: number = Math.floor(Math.random() * 26)
    const paywallIndex = state.story.items.findIndex(
      (item) => item.type === 'paywallSeparator'
    )
    const items: Storyboard['items'] = flatMap(
      state.story.items,
      (item, index): [Items] | [] => {
        const afterPaywall = paywallIndex > -1 && index > paywallIndex
        switch (item.type) {
          case 'imageAudio':
            return [
              {
                imageaudio: {
                  id: item.id,
                  afterPaywall,
                  light: !!item.light,
                  audio: item.audio
                    ? {
                        loop: !!item.loop,
                        mp3: media(item.audio.path),
                        // ogg: string
                        audio_credits: convertToHtml(item.audioCredits),
                      }
                    : undefined,
                  image: item.image
                    ? {
                        srcmain: media(item.image?.big.path),
                        srcmedium: media(item.image?.medium.path),
                        srcphone: media(item.image?.small.path),
                        alt: item.altText,
                        image_caption: item.title,
                        image_credits: convertToHtml(item.imageCredits),
                      }
                    : undefined,
                },
              },
            ]
          case 'fullpageVideo':
            return [
              {
                videofullpage: {
                  id: item.id,
                  afterPaywall,
                  format: {
                    fullpage: true,
                  },
                  title: convertToHtml(item.title),
                  text: convertToHtml(item.text),
                  loop: Boolean(item.loopVideo),
                  autoAdvance: Boolean(item.autoAdvance),
                  video: item.video
                    ? {
                        mp4: item.video.url
                          ? item.video.url
                          : media(item.video.path),
                      }
                    : undefined,
                  image: item.representativeImage
                    ? {
                        loading: media(item.representativeImage.big.path),
                      }
                    : undefined,
                  offset: item.offsetPortraitVideo
                    ? {
                        centre: item.offsetPortraitVideo.align === 'center',
                        left: item.offsetPortraitVideo.align === 'left',
                        right: item.offsetPortraitVideo.align === 'right',
                        custom: item.offsetPortraitVideo.align === 'custom',
                        value: item.offsetPortraitVideo.customValue,
                      }
                    : undefined,
                },
              },
            ]
          case 'backgroundImage':
            return [
              {
                imagebackground: {
                  id: item.id,
                  afterPaywall,
                  format: {
                    fullpage: !!item.fullPage,
                  },
                  title: convertToHtml(item.title),
                  subtitle: convertToHtml(item.subtitle),
                  align: {
                    center: item.alignBackgroundImageText === 'center',
                    left: item.alignBackgroundImageText === 'left',
                    right: item.alignBackgroundImageText === 'right',
                  },
                  text: convertToHtml(item.text),
                  image: item.image && {
                    srcmain: media(item.image.big.path),
                    srcphone: media(item.image.small.path),
                    srcmedium: media(item.image.medium.path),
                  },
                  audio: item.audio
                    ? {
                        mp3: item.audio.path,
                        loop: !!item.audioLoop,
                      }
                    : undefined,
                },
              },
            ]
          case 'backgroundVideo':
            return [
              {
                videobackground: {
                  id: item.id,
                  afterPaywall,
                  format: {
                    fullpage: !!item.fullPage,
                  },
                  video: item.video
                    ? {
                        mp4: item.video.url
                          ? item.video.url
                          : media(item.video.path),
                      }
                    : undefined,
                  title: convertToHtml(item.title),
                  subtitle: convertToHtml(item.subtitle),
                  text: convertToHtml(item.text),
                  image: item.posterImage
                    ? {
                        loading: media(item.posterImage.big.path),
                      }
                    : undefined,
                  backgroundprops: item.backgroundTextColor
                    ? {
                        active: {
                          value: `${item.backgroundTextColor.r}, ${item.backgroundTextColor.g}, ${item.backgroundTextColor.b}`,
                          opacity: `${item.backgroundTextColor.a}`,
                        },
                      }
                    : undefined,
                  offset: item.offsetPortraitVideo
                    ? {
                        centre: item.offsetPortraitVideo.align === 'center',
                        left: item.offsetPortraitVideo.align === 'left',
                        right: item.offsetPortraitVideo.align === 'right',
                        custom: item.offsetPortraitVideo.align === 'custom',
                        value: item.offsetPortraitVideo.customValue,
                      }
                    : undefined,
                },
              },
            ]
          case 'parallaxImage':
            return [
              {
                imageparallax: {
                  id: item.id,
                  afterPaywall,
                  title: item.title,
                  subtitle: convertToHtml(item.subtitle),
                  image: item.image && {
                    srcmain: media(item.image.big.path),
                    srcphone: media(item.image.small.path),
                    srcmedium: media(item.image.medium.path),
                  },
                },
              },
            ]
          case 'verticalSlideshow':
            return [
              {
                slideshowvertical: {
                  id: item.id,
                  afterPaywall,
                  title: convertToHtml(item.slideShowTitle),
                  light: !!item.light,
                  images: item.slides
                    ? item.slides.map((slide) => ({
                        title: slide.slideTitle,
                        credits: slide.slideCredits,
                        srcphone: slide.image
                          ? media(slide.image.small.path)
                          : undefined,
                        srcmedium: slide.image
                          ? media(slide.image.medium.path)
                          : undefined,
                        srcmain: slide.image
                          ? media(slide.image.big.path)
                          : undefined,
                      }))
                    : undefined,
                },
              },
            ]
          case 'horizontalSlideshow':
            return [
              {
                slideshowhorizontal: {
                  id: item.id,
                  afterPaywall,
                  title: convertToHtml(item.slideShowTitle),
                  light: !!item.light,
                  images: item.slides
                    ? item.slides.map((slide) => ({
                        title: slide.slideTitle,
                        credits: slide.slideCredits,
                        srcphone: slide.image
                          ? media(slide.image.small.path)
                          : undefined,
                        srcmedium: slide.image
                          ? media(slide.image.medium.path)
                          : undefined,
                        srcmain: slide.image
                          ? media(slide.image.big.path)
                          : undefined,
                      }))
                    : undefined,
                },
              },
            ]
          case 'text':
            return [
              {
                textcentred: {
                  id: item.id,
                  afterPaywall,
                  title: item.title,
                  subtitle: convertToHtml(item.subtitle),
                  light: Boolean(item.light),
                  intro: convertToHtml(item.introduction),
                  // snippets: {}
                },
              },
            ]
          case 'embedVideo':
            if (item.embed?.source === 'dailymotion') {
              return [
                {
                  dailymotion: {
                    id: item.id,
                    afterPaywall,
                    showControls: item.showControls,
                    autoAdvance: item.autoAdvance,
                    embed: item.embed,
                  },
                },
              ]
            } else if (item.embed?.source === 'vimeo') {
              return [
                {
                  vimeo: {
                    id: item.id,
                    afterPaywall,
                    showControls: item.showControls,
                    autoAdvance: item.autoAdvance,
                    embed: item.embed,
                  },
                },
              ]
            }
            return [
              {
                youtube: {
                  id: item.id,
                  afterPaywall,
                  showControls: item.showControls,
                  autoAdvance: item.autoAdvance,
                  embed: item.embed,
                },
              },
            ]

          case 'paywallSeparator':
            return [
              {
                paywallSeparator: {
                  id: item.id,
                },
              },
            ]
          default:
            return []
        }
      }
    )
    // close the paywall with a paywallSeparatorEnd if necessary
    if (items.find((item) => 'paywallSeparator' in item)) {
      items.push({
        paywallSeparatorEnd: {
          id: nanoid(),
        },
      })
    }
    return {
      meta: {
        title: state.story.metadata.title,
        site_name: state.story.metadata.siteName,
        splash_screen_img: state.story.metadata.siteImage
          ? media(state.story.metadata.siteImage.big.path)
          : undefined,
        ...(state.story.metadata.siteImage
          ? {
              site_img: absMedia(
                state.story.metadata.canonicalUrl || '.',
                state.story.metadata.siteImage.big.path
              ),
              site_img_width: state.story.metadata.siteImage.big.size.width,
              site_img_height: state.story.metadata.siteImage.big.size.height,
            }
          : {}),
        author: state.story.metadata.author,
        rsspingback: state.story.metadata.rssPingbkack,
        description: state.story.metadata.description,
        src: state.story.metadata.canonicalUrl,
        analytics: state.story.metadata.googleAnalyticsId,
        font_base_link: state.story.metadata.extraHeader,
        font_base_rules: state.story.metadata.mainFont,
        font_headers_rules: state.story.metadata.headerFont,
        custom_css: state.story.metadata.extraCss,
      },
      nav: state.story.items.flatMap((item, index) => {
        if ('navigationTitle' in item && item.navigationTitle) {
          return [{ title: item.navigationTitle, id: item.id, index: index }]
        }
        return []
      }),
      items,
      payment: {
        enabled: state.settings.payment.enabled,
        pointers: state.settings.payment.pointers,
        accessCode: encrypt(
          state.settings.payment.accessCode || '',
          rotationalValue
        ),
        rot: rotationalValue,
      },
    }
  }, [
    state.story.items,
    state.story.metadata.author,
    state.story.metadata.canonicalUrl,
    state.story.metadata.description,
    state.story.metadata.extraCss,
    state.story.metadata.extraHeader,
    state.story.metadata.googleAnalyticsId,
    state.story.metadata.headerFont,
    state.story.metadata.mainFont,
    state.story.metadata.rssPingbkack,
    state.story.metadata.siteImage,
    state.story.metadata.siteName,
    state.story.metadata.title,
    state.settings.payment,
  ])
  React.useEffect(() => {
    render(mappedState)
  }, [mappedState])
}
