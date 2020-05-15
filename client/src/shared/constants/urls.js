const urls = {
    client:
        process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000'
            : 'https://boiling-atoll-38153.herokuapp.com/',
    server: 'http://localhost:5000',
};

export default urls;
