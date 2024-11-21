import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { IProduct } from "./interfaces/IProduct";

export const PDFService = {
 
  async printStockProduct(products: IProduct[]) {
    console.log(products);
    const negocio = {
      nombre: "Moscow Ecommerce",
    };
    const fechaFormateada = new Date().toLocaleDateString("es-AR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const defaultFileName = `Listado de Productos ${fechaFormateada}`;

    let tablaPdf = [
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
      tablaPdf.push([
        { text: `${fila.id}`, fontSize: 11 },
        { text: `${fila.name}`, fontSize: 11 },
        { text: `${fila.description}`, fontSize: 11 },
        { text: `${fila.category.name}`, fontSize: 11 },
        { text: `${fila.stock}`, fontSize: 11 },
        { text: `${fila.price}`, fontSize: 11 },
      ]);
    }
    const data = {
      info: {
        title: defaultFileName,
        creator: `${negocio.nombre}`,
        author: `${negocio.nombre}`,
        subject: defaultFileName,
      },
      header: {
        table: {
          widths: ["auto", "auto", "*"],
          body: [
            [
              //   {
              //     image: "logo",
              //     width: 90,
              //   },
              {
                stack: [
                  {
                    text: `${negocio.nombre}`,
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
                  { text: `${fechaFormateada}`, style: "template2" },
                  {
                    text: `TOTAL: ${products.length} productos`,
                    style: "template3",
                  },
                ],

                alignment: "right",
              },
            ],
          ],
        },
        layout: "noBorders",
        heigth: "500",
        alignment: "right",
        margin: [20, 20, 20, 20],
      },
      footer: function (currentPage, pageCount) {
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
              "auto",
              "auto",
              "auto",
              "auto",
              "auto",
              "auto",
              "auto",
              "auto",
              "auto",
              "auto",
              "auto",
            ],
            body: tablaPdf,
          },
          alignment: "center",
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
    const pdfReparacion = pdfMake.createPdf(data).open();
  },
};
