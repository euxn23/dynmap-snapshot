import { Box, Button, Flex } from '@radix-ui/themes'
import { useState } from 'react'
import { Text } from '@radix-ui/themes'
import { R2_ENDPOINT } from '../env'
import { DateTime } from 'luxon'
import { imageBox, imageBoxButton, imageBoxTime, imageContent } from './ImageContainer.css'
import { heroImageSubject } from '../subjects/heroImage.ts'
import { Images } from '../subjects/images.ts'

export function ImageContainer({ className, type, images }: { className?: string; type: keyof Images; images: string[] }) {
  const [index, setIndex] = useState(0)
  const image = `${R2_ENDPOINT}/${images[index]}`
  const date = DateTime.fromFormat(images[index], `'${type}/'yyyy-MM-dd'T'HH-mm-ss'.png'`)

  return (
    <Flex direction="column" gap="2" className={className}>
      <Box className={imageBox} height="100%" width="100%">
        <img src={image} className={imageContent} />
        {type !== heroImageSubject.value && (
          <Button className={imageBoxButton} onClick={() => heroImageSubject.next(type)}>
            メインにする
          </Button>
        )}
        <Text className={imageBoxTime}>{`${date.year}-${date.month}-${date.day} ${date.hour}:00:00`}</Text>
      </Box>
      <link rel="preload" href={images[index + 12]} as="image" type="image/png" />
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
  )
}
