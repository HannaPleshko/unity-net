import { PORT } from './src/config/index.js';
import app from './src/app.js';

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
