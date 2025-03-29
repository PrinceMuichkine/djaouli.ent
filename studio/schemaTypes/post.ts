import { Rule } from 'sanity';

export default {
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "author",
      title: "Author",
      type: "reference",
      to: { type: "author" },
    },
    {
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text (for SEO & Accessibility)',
          type: 'string',
          options: { isHighlighted: true },
          validation: (Rule: Rule) => Rule.required()
        },
        {
          name: 'caption',
          title: 'Caption',
          type: 'string',
          options: { isHighlighted: true }
        }
      ],
    },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    },
    {
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "text",
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    },
    {
      name: 'postType',
      title: 'Post Type',
      type: 'string',
      options: {
        list: [
          { title: 'Article', value: 'article' },
          { title: 'Deep Dive', value: 'deep-dive' },
          { title: 'Story / Case Study', value: 'story' },
        ],
        layout: 'radio'
      },
      initialValue: 'standard'
    },
    {
      name: "body",
      title: "Body",
      type: "array",
      of: [
        {
          type: "block",
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text (for SEO & Accessibility)',
              type: 'string',
              options: { isHighlighted: true },
              validation: (Rule: Rule) => Rule.required()
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
              options: { isHighlighted: true }
            }
          ]
        },
        {
          name: 'videoEmbed',
          title: 'Video Embed',
          type: 'object',
          fields: [
            {
              name: 'url',
              title: 'Video URL',
              type: 'url',
              description: 'URL from YouTube, Vimeo, etc.',
              validation: (Rule: Rule) => Rule.required()
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string'
            }
          ],
          preview: {
            select: { url: 'url', caption: 'caption' },
            prepare({ url, caption }: { url: string; caption?: string }) {
              return {
                title: `Video: ${caption || url}`,
                subtitle: url
              }
            }
          }
        }
      ],
    },
    {
      name: 'readingTime',
      title: 'Estimated Reading Time (minutes)',
      type: 'number',
      readOnly: true,
      description: 'This could be auto-calculated from the body content.'
    },
    {
      name: 'isFeatured',
      title: 'Featured Post?',
      type: 'boolean',
      initialValue: false,
      description: 'Feature this post on the homepage or blog landing page.'
    }
  ],
} 