module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '30021955aaebd4ca14ee4699136b1722'),
  },
});
