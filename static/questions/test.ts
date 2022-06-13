import type { ScaleForm } from '../../src/components/Scales/types'

export const socialMedia: ScaleForm = {
  type: 'ordinal',
  content: [
    {
      title: 'What\'s your opinion on the new Facebook?',
      degrees: [
        'I\'m not sure',
        'I don\'t like it',
        'I like it',
        'I don\'t care',
      ],
    },
    {
      title: 'What\'s your opinion on the new Twitter?',
      degrees: [
        'I\'m not sure',
        'I don\'t like it',
        'I like it',
        'I don\'t care',
      ],
    },
    {
      title: 'What\'s your opinion on the new Instagram?',
      degrees: [
        'I\'m not sure',
        'I don\'t like it',
        'I like it',
        'I don\'t care',
      ],
    },
    {
      title: 'What\'s your opinion on the new Snapchat?',
      degrees: [
        'I\'m not sure',
        'I don\'t like it',
        'I like it',
        'I don\'t care',
      ],
    },
    {
      title: 'What\'s your opinion on the new Pinterest?',
      degrees: [
        'I\'m not sure',
        'I don\'t like it',
        'I like it',
        'I don\'t care',
      ],
    },
    {
      title: 'What\'s your opinion on the new Tumblr?',
      degrees: [
        'I\'m not sure',
        'I don\'t like it',
        'I like it',
        'I don\'t care',
      ],
    },
    {
      title: 'What\'s your opinion on the new Reddit?',
      degrees: [
        'I\'m not sure',
        'I don\'t like it',
        'I like it',
        'I don\'t care',
      ],
    },
    {
      title: 'What\'s your opinion on the new LinkedIn?',
      degrees: [
        'I\'m not sure',
        'I don\'t like it',
        'I like it',
        'I don\'t care',
      ],
    },
    {
      title: 'What\'s your opinion on the new Tumblr?',
      degrees: [
        'I\'m not sure',
        'I don\'t like it',
        'I like it',
        'I don\'t care',
      ],
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
