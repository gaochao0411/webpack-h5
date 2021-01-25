import layout from '../../layout/index.js';
import content from './index.ejs';
const title = '首页';
const keyword = '首页';
const description = '首页描述';

export default layout.render({
    title,
    keyword,
    description,
    content,
});
