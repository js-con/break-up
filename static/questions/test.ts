import type { ScaleForm } from '../../src/components/Scales/types'

export const socialMedia: ScaleForm = {
  type: 'ordinal',
  config: {
    degree: 5,
    defaultDegree: 3,
    leftText: '不同意',
    rightText: '同意',
  },
  content: [
    {
      title: 'What\'s your opinion on the new Facebook?',
    },
    {
      title: 'What\'s your opinion on the new Twitter?',
    },
    {
      title: 'What\'s your opinion on the new Instagram?',
    },
    {
      title: 'What\'s your opinion on the new Snapchat?',
    },
    {
      title: 'What\'s your opinion on the new Pinterest?',
    },
    {
      title: 'What\'s your opinion on the new Tumblr?',
    },
    {
      title: 'What\'s your opinion on the new Reddit?',
    },
    {
      title: 'What\'s your opinion on the new LinkedIn?',
    },
    {
      title: 'What\'s your opinion on the new Tumblr?',
    },
  ],
}

export const diet: ScaleForm = {
  type: 'nominal',
  content: [
    {
      title: 'what is your favorate food?',
      options: [
        'banana',
        'apple',
        'melon',
        'peach',
      ],
    },
    {
      title: 'what is your favorate drink?',
      options: [
        'coke',
        'pepsi',
        'water',
        'milk',
      ],
    },
    {
      title: 'what is your favorate dessert?',
      options: [
        'cake',
        'ice cream',
        'pie',
        'pudding',
      ],
    },
    {
      title: 'what is your favorate snack?',
      options: [
        'chips',
        'pizza',
        'sandwich',
        'burger',
      ],
    },
    {
      title: 'what is your favorate meat?',
      options: [
        'chicken',
        'pork',
        'beef',
        'lamb',
      ],
    },
  ],

}
export default [
  {
    name: 'socialMedia',
    introduction: 'your opinion on social media',
    questions: socialMedia,
  },
  {
    name: 'diet',
    introduction: 'your favorate diet',
    questions: diet,
  },
]
