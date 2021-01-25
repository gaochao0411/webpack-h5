
import layoutEjs from './layout.ejs';

export default {
    render: ({ title, keyword, description, content}) => {
        const renderData = {
            title,
            keyword,
            description,
            content: typeof content === 'string' ? content : content(),
            console: process.env.NODE_ENV !== 'production',
        };
        return layoutEjs(renderData);
    }
};
