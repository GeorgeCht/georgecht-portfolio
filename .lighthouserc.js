'use strict'

module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000'],
      startServerCommand: 'npx serve@latest out',
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'dom-size': ['error', { maxNumericValue: 3000 }],

        'csp-xss': 'off',
        'unsized-images': 'off',
        'uses-rel-preload': 'off',
        'uses-responsive-images': 'off',
        'uses-rel-preconnect': 'off',
        'preload-lcp-image': 'off',
        'offscreen-images': 'off',
        'unused-javascript': 'off',
        'non-composited-animations': 'off',
        'inspector-issues': 'off',
        'third-party-cookies': 'off',
        'target-size': 'off',
        'total-byte-weight': 'off',
        'video-caption': 'off',
        'largest-contentful-paint': 'off',
        'mainthread-work-breakdown': 'off',

        label: 'off',
        'content-width': 'off',
        'color-contrast': 'off',
        bypass: 'off',
        'tap-targets': 'off',

        'apple-touch-icon': 'off',
        'maskable-icon': 'off',
        'installable-manifest': 'off',
        'service-worker': 'off',
        'splash-screen': 'off',
        'themed-omnibox': 'off',
        'server-response-time': 'off',
        'uses-long-cache-ttl': 'off',

        'bootup-time': ['warn', { minScore: 0 }],
        interactive: ['warn', { minScore: 0.1 }],
        'max-potential-fid': ['warn', { minScore: 0.5 }],
        'speed-index': ['warn', { minScore: 0.01 }],
      },
    },
    upload: {
      urlReplacementPatterns: [
        's/[0-9a-f]{12}$/HASH/',
        's#:[0-9]{3,5}/#:PORT/#',
        's/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/UUID/ig',
      ],
    },
  },
}
