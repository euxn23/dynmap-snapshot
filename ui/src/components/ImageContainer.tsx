import { Box, Button, Flex } from '@radix-ui/themes'
import { useState } from 'react'
import { Text } from '@radix-ui/themes'
import { R2_ENDPOINT } from '../env'
import { DateTime } from 'luxon'
import { imageBox, imageSelectMainButton, imageBoxTime, imageContent, imageZoomButtons, imageZoomButton } from './ImageContainer.css'
import { heroImageSubject } from '../subjects/heroImage.ts'
import { Images } from '../subjects/images.ts'
import { Helmet } from 'react-helmet-async'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'

export function ImageContainer({ className, type, images }: { className?: string; type: keyof Images; images: string[] }) {
  const [index, setIndex] = useState(0)
  const image = `${R2_ENDPOINT}/${images[index]}`
  const date = DateTime.fromFormat(images[index], `'${type}/'yyyy-MM-dd'T'HH-mm-ss'.png'`)

  return (
    <>
      <Helmet>
        {index >= 24 && <link rel="preload" href={`${R2_ENDPOINT}/${images[index - 24]}`} as="image" type="image/png" />}
        {index >= 12 && <link rel="preload" href={`${R2_ENDPOINT}/${images[index - 12]}`} as="image" type="image/png" />}
        {index >= 6 && <link rel="preload" href={`${R2_ENDPOINT}/${images[index - 6]}`} as="image" type="image/png" />}
        {index >= 1 && <link rel="preload" href={`${R2_ENDPOINT}/${images[index - 1]}`} as="image" type="image/png" />}
        {index < images.length - 1 && <link rel="preload" href={`${R2_ENDPOINT}/${images[index + 1]}`} as="image" type="image/png" />}
        {index < images.length - 6 && <link rel="preload" href={`${R2_ENDPOINT}/${images[index + 6]}`} as="image" type="image/png" />}
        {index < images.length - 12 && <link rel="preload" href={`${R2_ENDPOINT}/${images[index + 12]}`} as="image" type="image/png" />}
        {index < images.length - 24 && <link rel="preload" href={`${R2_ENDPOINT}/${images[index + 24]}`} as="image" type="image/png" />}
      </Helmet>
      <Flex direction="column" gap="2" className={className}>
        <Box className={imageBox} height="100%" width="100%">
          {type === heroImageSubject.value ? (
            <TransformWrapper key={type} initialScale={1} wheel={{ disabled: true }} disablePadding={true}>
              {({ zoomIn, zoomOut }) => (
                <>
                  <TransformComponent>
                    <img src={image} className={imageContent} rel="preload" height="3840px" width="2140px" />
                  </TransformComponent>
                  <Flex className={imageZoomButtons} gap="2">
                    <Button onClick={() => zoomIn()} className={imageZoomButton}>
                      +
                    </Button>
                    <Button onClick={() => zoomOut()} className={imageZoomButton}>
                      -
                    </Button>
                  </Flex>
                </>
              )}
            </TransformWrapper>
          ) : (
            <>
              <img src={image} className={imageContent} rel="preload" height="3840px" width="2140px" />
              <Button className={imageSelectMainButton} onClick={() => heroImageSubject.next(type)}>
                メインにする
              </Button>
            </>
          )}
          <Text className={imageBoxTime}>{`${date.year}-${date.month}-${date.day} ${date.hour}:00:00`}</Text>
        </Box>
        <Flex justify="center" gap="2">
          <Button disabled={index < 24} onClick={() => setIndex(index - 24)}>
            +1D
          </Button>
          <Button disabled={index < 12} onClick={() => setIndex(index - 12)}>
            +12H
          </Button>
          <Button disabled={index < 6} onClick={() => setIndex(index - 6)}>
            +6H
          </Button>
          <Button disabled={index === 0} onClick={() => setIndex(index - 1)}>
            +1H
          </Button>
          <Button disabled={index === images.length - 1} onClick={() => setIndex(index + 1)}>
            -1H
          </Button>
          <Button disabled={index > images.length - 7} onClick={() => setIndex(index + 6)}>
            -6H
          </Button>
          <Button disabled={index > images.length - 13} onClick={() => setIndex(index + 12)}>
            -12H
          </Button>
          <Button disabled={index > images.length - 25} onClick={() => setIndex(index + 24)}>
            -1D
          </Button>
        </Flex>
      </Flex>
    </>
  )
}
