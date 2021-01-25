import layout from '../../layout/index.js';
import content from './index.ejs';
const title = '活动1';
const keyword = '活动';
const description = '这是活动1';

export default layout.render({
    title,
    keyword,
    description,
    content,
});
