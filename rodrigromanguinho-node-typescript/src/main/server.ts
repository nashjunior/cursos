import MongoHelper from '../infrastructure/db/mongodb/helpers/MongoHelper';
import env from './confg/env';

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = await (await import(`./confg/app`)).default;
    app.listen(env.port, () =>
      console.log(`Server running at http://localhost:3333`),
    );
  })
  .catch(console.error);
