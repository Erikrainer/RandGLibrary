const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    getSingleUser: async (_, { _id, username }) => {
      const foundUser = await User.findOne({
        $or: [{ _id: _id }, { username: username }],
      });

      if (!foundUser) {
        throw new Error('Cannot find a user with this id or username!');
      }

      return foundUser;
    },
  },
  Mutation: {
    createUser: async (_, { username, email, password }) => {
      const user = await User.create({ username, email, password });

      if (!user) {
        throw new Error('Something is wrong!');
      }
      const token = signToken(user);
      return { token, user };
    },

    login: async (_, { username, email, password }) => {
      const user = await User.findOne({ $or: [{ username }, { email }] });
      if (!user) {
        throw new Error("Can't find this user");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new Error('Wrong password!');
      }
      const token = signToken(user);
      return { token, user };
    },

    saveBook: async (_, { bookId, authors, description, title, image, link }, context) => {
      const { user } = context;
      if (!user) {
        throw new AuthenticationError('You need to be logged in!');
      }

      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $addToSet: { savedBooks: { bookId, authors, description, title, image, link } } },
        { new: true, runValidators: true }
      );

      if (!updatedUser) {
        throw new Error('Error saving book!');
      }

      return updatedUser; 
    },

    deleteBook: async (_, { bookId }, context) => {
      const { user } = context;
      if (!user) {
        throw new AuthenticationError('You need to be logged in!');
      }

      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $pull: { savedBooks: { bookId } } },
        { new: true }
      );

      if (!updatedUser) {
        throw new Error("Couldn't find user with this id!");
      }

      return updatedUser;
    },
  },
};

module.exports = resolvers;
