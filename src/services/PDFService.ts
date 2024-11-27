import pdfMake from "pdfmake/build/pdfmake";
// import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.fonts = {
    Roboto: {
      normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
      bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
      italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
      bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf'
    }
 }
import { IProduct } from "./interfaces/IProduct";
import { PriceFormatter } from "@/utils/PriceFormatter";
import { DateFormatterWithHour } from "@/utils/DateFormatter";
import { Alignment, Content } from "pdfmake/interfaces";

export const PDFService = {
  async printStockProduct(products: IProduct[], title: string) {

    const negocio = {
      name: "Moscow Ecommerce",
    };
    const fechaFormateada = DateFormatterWithHour(new Date());
    const defaultFileName = `${title} ${fechaFormateada}`;

    let table = [
      [
        {
          text: "NRO",
          style: "tableHeader",
          fontSize: 11,
          bold: true,
          fillColor: "#cccccc",
        },
        {
          text: "NOMBRE",
          style: "tableHeader",
          fontSize: 11,
          bold: true,
          fillColor: "#cccccc",
        },
        {
          text: "DESCRIPCION",
          style: "tableHeader",
          fontSize: 11,
          bold: true,
          fillColor: "#cccccc",
        },
        {
          text: "CATEGORIA",
          style: "tableHeader",
          fontSize: 11,
          bold: true,
          fillColor: "#cccccc",
        },
        {
          text: "STOCK",
          style: "tableHeader",
          fontSize: 11,
          bold: true,
          fillColor: "#cccccc",
        },
        {
          text: "PRECIO",
          style: "tableHeader",
          fontSize: 11,
          bold: true,
          fillColor: "#cccccc",
        },
      ],
    ];

    for (const fila of products) {
      table.push([
        { text: `${fila.id}`, fontSize: 11, style: "tableBody", bold: false, fillColor: "#ffffff" },
        { text: `${fila.name}`, fontSize: 11, style: "tableBody", bold: false, fillColor: "#ffffff" },
        { text: `${fila.description}`, fontSize: 11, style: "tableBody", bold: false, fillColor: "#ffffff" },
        { text: `${fila.category.name}`, fontSize: 11, style: "tableBody", bold: false, fillColor: "#ffffff" },
        { text: `${fila.stock}`, fontSize: 11, style: "tableBody", bold: false, fillColor: "#ffffff" },
        { text: `${PriceFormatter(fila.price)}`, fontSize: 11, style: "tableBody", bold: false, fillColor: "#ffffff" },
      ]);
    }
    const data = {
      info: {
        title: defaultFileName,
        creator: `${negocio.name}`,
        author: `${negocio.name}`,
        subject: defaultFileName,
      },
      header: {
        table: {
          widths: ["*", "*"],
          body: [
            [
              //   {
              //     image: "logo",
              //     width: 90,
              //   },
              {
                stack: [
                  {
                    text: `${negocio.name}`,
                    style: "template2",
                    bold: true,
                    alignment: "left",
                  },
                  {
                    text: [
                      { text: "Fecha: ", bold: true },
                      `${fechaFormateada}`,
                    ],
                    style: "template3",
                    alignment: "left",
                  },
                ],
                margin: [0, 0, 0, 0],
              },
              {
                stack: [
                  { text: `LISTADO DE PRODUCTOS`, style: "template1" },
                  { text: ``, style: "template2" },
                  { text: `${fechaFormateada}`, style: "template2" },
                  {
                    text: `TOTAL: ${products.length} productos`,
                    style: "template3",
                  },
                ],

                alignment: "right" as Alignment,
              },
            ],
          ],
        },
        layout: "noBorders",
        heigth: "500",
        alignment: "right",
        margin: [20, 20, 20, 20],
      },
      footer: function (currentPage: number, pageCount: number): Content {
        return {
          text: currentPage.toString() + " de " + pageCount,
          margin: [30, 0, 30, 0],
          alignment: "right",
        };
      },
      content: [
        {
          table: {
            widths: [
              "*",
              "*",
              "*",
              "*",
              "*",
              "*",
            ],
            body: table,
          },
          alignment: "center" as Alignment,
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: "center",
          margin: [0, 0, 0, 20],
        },

        subheader: {
          fontSize: 14,
          margin: [0, 0, 0, 20],
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: "black",
        },
        tableExample: {
          bold: true,
          fontSize: 30,
          alignment: "center",
          margin: [0, 0, 0, 20],
          color: "black",
        },
        template1: {
          fontSize: 16,
          bold: true,
        },
        template2: {
          fontSize: 14,
          bold: true,
        },
        template3: {
          fontSize: 12,
          aligment: "left",
        },
      },
      //   images: {
      //     logo: `${negocio.logo}`,
      //   },
      pageSize: "A4",
      pageOrientation: "landscape",
      pageMargins: [30, 130, 30, 50],
    };
    pdfMake.createPdf(data).open();  
  },

  async printSalesMonthly(sales: any) {
    const title = "Reporte de Ventas Mensual";
    const negocio = {
      name: "Moscow Ecommerce",
    };
    const fechaFormateada = DateFormatterWithHour(new Date());
    const defaultFileName = `${title} ${fechaFormateada}`;
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const formattedSales = sales
      .filter(sale => {
      const saleDate = new Date(sale.createtime);
      return saleDate.getMonth() === currentMonth && saleDate.getFullYear() === currentYear;
      })
      .map(sale => {
      // Crear un mapa para agrupar los productos por ID
      const groupedProducts = sale.products.reduce((acc, product) => {
        if (!acc[product.id]) {
        acc[product.id] = { ...product, quantity: 1 }; // Si no existe, lo inicializamos con quantity 1
        } else {
        acc[product.id].quantity += 1; // Si ya existe, aumentamos la cantidad
        }
        return acc;
      }, {});
      
      // Convertir el objeto agrupado a un array
      const products = Object.values(groupedProducts).map(product => ({
        name: product.name,
        category: product.category.name,
        price: product.price,
        quantity: product.quantity
      }));
      
      return {
        total: sale.total,
        date: sale.createtime,
        products
      };
      });
    
    
    console.log(formattedSales);
    let table = [
      [
        {
          text: "FECHA",
          style: "tableHeader",
          fontSize: 11,
          bold: true,
          fillColor: "#cccccc",
        },
        {
          text: "NOMBRE",
          style: "tableHeader",
          fontSize: 11,
          bold: true,
          fillColor: "#cccccc",
        },
        {
          text: "CATEGORIA",
          style: "tableHeader",
          fontSize: 11,
          bold: true,
          fillColor: "#cccccc",
        },
        {
          text: "PRECIO",
          style: "tableHeader",
          fontSize: 11,
          bold: true,
          fillColor: "#cccccc",
        },
        {
          text: "CANTIDAD",
          style: "tableHeader",
          fontSize: 11,
          bold: true,
          fillColor: "#cccccc",
        },
        {
          text: "TOTAL",
          style: "tableHeader",
          fontSize: 11,
          bold: true,
          fillColor: "#cccccc",
        },
      ],
    ];

    for (const sale of formattedSales) {
      for (const product of sale.products) {
        table.push([
          { text: `${sale.date}`, fontSize: 11, style: "tableBody", bold: false, fillColor: "#ffffff" },
          { text: `${product.name}`, fontSize: 11, style: "tableBody", bold: false, fillColor: "#ffffff" },
          { text: `${product.category}`, fontSize: 11, style: "tableBody", bold: false, fillColor: "#ffffff" },
          { text: `${PriceFormatter(product.price)}`, fontSize: 11, style: "tableBody", bold: false, fillColor: "#ffffff" },
          { text: `${product.quantity}`, fontSize: 11, style: "tableBody", bold: false, fillColor: "#ffffff" },
          { text: `${PriceFormatter(product.price * product.quantity)}`, fontSize: 11, style: "tableBody", bold: false, fillColor: "#ffffff" },
        ]);
      }
    }
    const data = {
      info: {
        title: defaultFileName,
        creator: `${negocio.name}`,
        author: `${negocio.name}`,
        subject: defaultFileName,
      },
      header: {
        table: {
          widths: ["*", "*"],
          body: [
            [
              //   {
              //     image: "logo",
              //     width: 90,
              //   },
              {
                stack: [
                  {
                    text: `${negocio.name}`,
                    style: "template2",
                    bold: true,
                    alignment: "left",
                  },
                  {
                    text: [
                      { text: "Fecha: ", bold: true },
                      `${fechaFormateada}`,
                    ],
                    style: "template3",
                    alignment: "left",
                  },
                ],
                margin: [0, 0, 0, 0],
              },
              {
                stack: [
                  { text: `VENTAS DEL MES`, style: "template1" },
                  { text: ``, style: "template2" },
                  { text: `${fechaFormateada}`, style: "template2" },
                  {
                    text: `TOTAL: ${formattedSales.length} ventas`,
                    style: "template3",
                  },
                ],

                alignment: "right" as Alignment,
              },
            ],
          ],
        },
        layout: "noBorders",
        heigth: "500",
        alignment: "right",
        margin: [20, 20, 20, 20],
      },
      footer: function (currentPage: number, pageCount: number): Content {
        return {
          text: currentPage.toString() + " de " + pageCount,
          margin: [30, 0, 30, 0],
          alignment: "right",
        };
      },
      content: [
        {
          table: {
            widths: [
              "*",
              "*",
              "*",
              "*",
              "*",
              "*",
            ],
            body: table,
          },
          alignment: "center" as Alignment,
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: "center",
          margin: [0, 0, 0, 20],
        },

        subheader: {
          fontSize: 14,
          margin: [0, 0, 0, 20],
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: "black",
        },
        tableExample: {
          bold: true,
          fontSize: 30,
          alignment: "center",
          margin: [0, 0, 0, 20],
          color: "black",
        },
        template1: {
          fontSize: 16,
          bold: true,
        },
        template2: {
          fontSize: 14,
          bold: true,
        },
        template3: {
          fontSize: 12,
          aligment: "left",
        },
      },
      //   images: {
      //     logo: `${negocio.logo}`,
      //   },
      pageSize: "A4",
      pageOrientation: "landscape",
      pageMargins: [30, 130, 30, 50],
    };
    pdfMake.createPdf(data).open();  
  },
  async printSales(sales: any) {
    const title = "Reporte de Ventas Anual";
    const negocio = {
      name: "Moscow Ecommerce",
    };
    const fechaFormateada = DateFormatterWithHour(new Date());
    const defaultFileName = `${title} ${fechaFormateada}`;
    const formattedSales = sales.map(sale => {
      // Crear un mapa para agrupar los productos por ID
      const groupedProducts = sale.products.reduce((acc, product) => {
        if (!acc[product.id]) {
          acc[product.id] = { ...product, quantity: 1 }; // Si no existe, lo inicializamos con quantity 1
        } else {
          acc[product.id].quantity += 1; // Si ya existe, aumentamos la cantidad
        }
        return acc;
      }, {});
    
      // Convertir el objeto agrupado a un array
      const products = Object.values(groupedProducts).map(product => ({
        name: product.name,
        category: product.category.name,
        price: product.price,
        quantity: product.quantity
      }));
    
      return {
        total: sale.total,
        date: sale.createtime,
        products
      };
    });
    
        let table = [
      [
        {
          text: "FECHA",
          style: "tableHeader",
          fontSize: 11,
          bold: true,
          fillColor: "#cccccc",
        },
        {
          text: "NOMBRE",
          style: "tableHeader",
          fontSize: 11,
          bold: true,
          fillColor: "#cccccc",
        },
        {
          text: "CATEGORIA",
          style: "tableHeader",
          fontSize: 11,
          bold: true,
          fillColor: "#cccccc",
        },
        {
          text: "PRECIO",
          style: "tableHeader",
          fontSize: 11,
          bold: true,
          fillColor: "#cccccc",
        },
        {
          text: "CANTIDAD",
          style: "tableHeader",
          fontSize: 11,
          bold: true,
          fillColor: "#cccccc",
        },
        {
          text: "TOTAL",
          style: "tableHeader",
          fontSize: 11,
          bold: true,
          fillColor: "#cccccc",
        },
      ],
    ];

    for (const sale of formattedSales) {
      for (const product of sale.products) {
        table.push([
          { text: `${sale.date}`, fontSize: 11, style: "tableBody", bold: false, fillColor: "#ffffff" },
          { text: `${product.name}`, fontSize: 11, style: "tableBody", bold: false, fillColor: "#ffffff" },
          { text: `${product.category}`, fontSize: 11, style: "tableBody", bold: false, fillColor: "#ffffff" },
          { text: `${PriceFormatter(product.price)}`, fontSize: 11, style: "tableBody", bold: false, fillColor: "#ffffff" },
          { text: `${product.quantity}`, fontSize: 11, style: "tableBody", bold: false, fillColor: "#ffffff" },
          { text: `${PriceFormatter(product.price * product.quantity)}`, fontSize: 11, style: "tableBody", bold: false, fillColor: "#ffffff" },
        ]);
      }
    }
    const data = {
      info: {
        title: defaultFileName,
        creator: `${negocio.name}`,
        author: `${negocio.name}`,
        subject: defaultFileName,
      },
      header: {
        table: {
          widths: ["*", "*"],
          body: [
            [
              //   {
              //     image: "logo",
              //     width: 90,
              //   },
              {
                stack: [
                  {
                    text: `${negocio.name}`,
                    style: "template2",
                    bold: true,
                    alignment: "left",
                  },
                  {
                    text: [
                      { text: "Fecha: ", bold: true },
                      `${fechaFormateada}`,
                    ],
                    style: "template3",
                    alignment: "left",
                  },
                ],
                margin: [0, 0, 0, 0],
              },
              {
                stack: [
                  { text: `VENTAS DEL MES`, style: "template1" },
                  { text: ``, style: "template2" },
                  { text: `${fechaFormateada}`, style: "template2" },
                  {
                    text: `TOTAL: ${formattedSales.length} ventas`,
                    style: "template3",
                  },
                ],

                alignment: "right" as Alignment,
              },
            ],
          ],
        },
        layout: "noBorders",
        heigth: "500",
        alignment: "right",
        margin: [20, 20, 20, 20],
      },
      footer: function (currentPage: number, pageCount: number): Content {
        return {
          text: currentPage.toString() + " de " + pageCount,
          margin: [30, 0, 30, 0],
          alignment: "right",
        };
      },
      content: [
        {
          table: {
            widths: [
              "*",
              "*",
              "*",
              "*",
              "*",
              "*",
            ],
            body: table,
          },
          alignment: "center" as Alignment,
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: "center",
          margin: [0, 0, 0, 20],
        },

        subheader: {
          fontSize: 14,
          margin: [0, 0, 0, 20],
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: "black",
        },
        tableExample: {
          bold: true,
          fontSize: 30,
          alignment: "center",
          margin: [0, 0, 0, 20],
          color: "black",
        },
        template1: {
          fontSize: 16,
          bold: true,
        },
        template2: {
          fontSize: 14,
          bold: true,
        },
        template3: {
          fontSize: 12,
          aligment: "left",
        },
      },
      //   images: {
      //     logo: `${negocio.logo}`,
      //   },
      pageSize: "A4",
      pageOrientation: "landscape",
      pageMargins: [30, 130, 30, 50],
    };
    pdfMake.createPdf(data).open();  
  },
};
