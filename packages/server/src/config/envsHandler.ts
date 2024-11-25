import Joi from 'joi';

const validate = () => {
  const envSchema = Joi.object({
    API_PORT: Joi.number().required(),
    DB_CONN: Joi.string().required(),
  }).unknown();

  const { error } = envSchema.validate(process.env);

  if (!error) {
    console.log('⚙️ Environment variables loaded');
  } else {
    console.error('📛 Environment variables loading failed', error.message);
    process.exit(1);
  }
};

export default { validate };
