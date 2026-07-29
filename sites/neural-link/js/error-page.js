/**
 * Neural-Link Error Page
 * 404 - Neural Path Not Found
 */

export const errorPage = {
  code: 404,
  title: 'Neural Path Disconnected',
  message: 'The synaptic pathway you are attempting to access does not exist in our neural network.',
  suggestion: 'Try navigating to a known memory location or return to the neural map.',
  quickLinks: [
    { href: '/', label: 'Return to Neural Hub' },
    { href: '#neural-map', label: 'View Neural Map' },
    { href: '#memory-palace', label: 'Memory Palace' },
    { href: '#synapse-gallery', label: 'Synapse Gallery' }
  ]
};

export default errorPage;
