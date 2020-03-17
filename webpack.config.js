const HtmlWebpackLoader = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

/*
  Se tienen que instalar los paquetes, pero solo en modo desarrollo
    
    - style-loader
    - css-loader
    - html-loader
    - file-loader
    - html-webpack-plugin
    - mini-css-extract-plugin
    - optimize-css-assets-webpack-plugin
    - babel-loader
    - @babel/core     Sirve para convertir el código de ECMAscript a javascript para que sea soportado por navegadores antiguos
    - babel-preset-minify
    - babel-minify-webpack-plugin
    - @babel/preset-env
    - lean-webpack-plugin      Sirve para limpiar la carpeta *dist* cada vez que se ejecute el build de producción
 */

module.exports = {
    mode: "development",
    optimization: {
        /*
      Se crea la Configuración para que cuando el proyecto se lleve a producción los archivos css se minimicen
    */
        minimizer: [new OptimizeCssAssetsWebpackPlugin()]
    },
    module: {
        rules: [
            {
                // Configuración para los archivos CSS
                test: /\.css$/, // Se crea la expresión regular con la cual se trataran los archivos CSS
                exclude: /styles\.css$/, // Lista los archivos que se excluiran en esta Configuración
                use: ["style-loader", "css-loader"] // Se lista los paquetes que se utilizaran en el proceso. OJO: Deben ir en el mismo orden
            },
            {
                // Configuración par el archivo CSS Global
                test: /styles\.css$/, // Archivo CSS que se cargará
                use: [MiniCssExtractPlugin.loader, "css-loader"] // Este utiliza un plugin arparte para que el archivo se cargue en el archivo HTML
            },
            {
                // Configración para trabajar con los archivos HTML
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader", // Nombre del paquete que se utilizará
                        options: {
                            minimize: false
                        }
                    }
                ]
            },
            // Configuración para las imágenes
            {
                test: /\.(png|svg|jpg|gif)$/, // Evalúa las extensiones permitidas para las imágenes por medio de una expresión regular
                use: [
                    {
                        loader: "file-loader", // Se asgina el paquete que se utlizará para el uso de las mágenes
                        options: {
                            esModule: false,
                            name: "assets/imgs/[name].[ext]" // Se crea la ruta de donde se guardará la imagen una vez generada la carpeta *dist*
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackLoader({
            // Instancia para la Configuración de los archivos HRML, el primer parametro es para saber de donde se obtendrá la plantilla, la segunda el nombre con el cual se guardará
            template: "./src/index.html",
            filename: "./index.html"
        }),
        new MiniCssExtractPlugin({
            //El primer parametro es para el nombre que se le asignará al archivo CSS global, OJO: Obtendrá el nombre con el cual está guardado el archivo base
            filename: "[name].css",
            ignoreOrder: false
        }),
        new CleanWebpackPlugin()
    ]
};
