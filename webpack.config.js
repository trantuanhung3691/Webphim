var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports ={
    // đầu vào
    entry: {
        index: './src/app/controller/index.ts',
        cart: './src/app/controller/cart.ts',
        //admin: './src/app/controller/admin.js'
    },
    // đầu ra
    output:{
        path:path.resolve(__dirname,'dist'),
        filename: 'js/[name].js'
    },
    
    module: {
        rules:[
            {
                // do không xử lý dc file css mà chỉ xử lý dc file js nên thêm đoạn code này vô
                // gõ termial: npm install css-loader style-loader --save-dev
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test:/\.ts$/,
                use:['ts-loader']
            },
            {
                test:/\.html$/,
                use:['html-loader']
            },
            {
                // do không xử lý dc hình nên thêm đoạn code này vô
                // gõ termial: npm install url-loader file-loader --save-dev
                test:/\.(png|jpg|svg)$/,
                use:[{
                    loader: "file-loader",
                    options:{
                        limit: 10000, // giới hạn dung lượng
                        name: '[name].[ext]', // lấy lại tên và đuôi file
                        outputPath:"img/", // ném ra thư mục
                        publicPath:"img/"
                    }
                }]
            },
            {
                // do không xử lý được file scss nên thêm đoạn code này vô
                // gõ termial: npm install sass-loader node-sass --save-dev
                test:/\.scss$/,
                use:['style-loader','css-loader','sass-loader']
            }
        ]
    },
    resolve:{
        // cho phép import những file .ts , .js mà không cần gõ đuôi file
        extensions:['.ts', '.js']
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/app/Views/index.html',
            chunks:['index']
        }),
        new HtmlWebpackPlugin({
            filename: 'cart.html',
            template: './src/app/Views/cart.html',
            chunks:['cart']
        }),
        // new HtmlWebpackPlugin({
        //     filename: 'admin.html',
        //     template: './src/app/Views/admin.html',
        //     chunks:['admin']
        // })
    ],
    devServer:{
        contentBase:'./dist'
    }

}