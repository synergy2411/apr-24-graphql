let Subscription = {
  comment: {
    subscribe: (parent, args, { pubsub }, info) => {
      return pubsub.subscribe("comment");
    },
    resolve: (payload) => payload,
  },
  post: {
    subscribe(parent, args, { pubsub }, info) {
      return pubsub.subscribe("post");
    },
    resolve(payload) {
      return payload;
    },
  },
};

export default Subscription;
