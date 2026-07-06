export default {
  rest: {
    defaultLimit: 25,
    maxLimit: 50,
    // Skip COUNT(*) on list endpoints — saves a DB round-trip per request.
    withCount: false,
  },
};
