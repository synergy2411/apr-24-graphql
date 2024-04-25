let Subscription = {
  comment: {
    subscribe: (parent, args, { pubsub }, info) => {
      return pubsub.subscribe("comment");
    },
    resolve: (payload) => payload,
  },
};

export default Subscription;
