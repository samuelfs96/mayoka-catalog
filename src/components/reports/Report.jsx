import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import banner from "../../img/banner.png";
//import bannerblack from "../../img/banner-black.png";
import footer from "../../img/footer.png";
import SofiaRegular from "../../fonts/SofiaSansCondensed-Regular.ttf";
import SofiaLight from "../../fonts/SofiaSansCondensed-Light.ttf";
import SofiaBold from "../../fonts/SofiaSansCondensed-Bold.ttf";
//import finaldata from "./data.json";

// Register font
Font.register({
  family: "SofiaSansCondensed",
  fonts: [
    { src: SofiaRegular }, // font-style: normal, font-weight: normal
    { src: SofiaLight, fontWeight: 300 },
    { src: SofiaBold, fontWeight: 700 },
  ],
});
// Create styles
const styles = StyleSheet.create({
  page: {
    fontFamily: "SofiaSansCondensed",
    backgroundColor: "#0000",
    paddingBottom: 40,
  },
  section: {
    paddingHorizontal: 35,
    gap: 4,
  },
  row: {
    flexDirection: "row",
    gap: 25,
    textAlign: "justify",
    justifyContent: "space-between",
  },
  pageNumber: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
    fontSize: 12,
    zIndex: 100,
  },
  title: {
    textTransform: "uppercase",
    fontSize: 16,
    marginBottom: 1,
  },
  code: {
    color: "black",
    fontSize: 14,
    marginBottom: 14,
    fontWeight: 300,
    textTransform: "uppercase",
  },
  price: {
    color: "#0097B2",
    fontSize: 18,
    fontWeight: 400,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 0,
    height: 30,
  },
});

function Report() {
  return (
    <Document>
      <Page size="A4" style={styles.page} orientation="landscape">
        <View>
          <Image src={banner} fixed />
          <br style={{ marginBottom: "20px" }} fixed />
          <View style={styles.section}>
            {[].map((product, key) => (
              <>
                <View>
                  <Text style={styles.code}>{Object.keys(product)[0]}</Text>
                </View>
                <View key={key} style={styles.row}>
                  {Object.values(product).map((values) =>
                    Object.entries(values).map(([company, valuesi], key) => (
                      <View
                        style={{
                          backgroundColor:
                            company === "futuro" ? "#85c4cf" : "#e0dfd5",
                          width: "50%",
                        }}
                      >
                        {/* <Text style={styles.code}>{company}</Text> */}
                        {/* <View key={key} style={styles.row}>
                                            <Text style={styles.code}>Producto</Text>
                                            <Text style={styles.code}>Precio Unidad</Text>
                                            <Text style={styles.code}>Precio Caja</Text>
                                        </View> */}
                        {valuesi.map((item, key) => (
                          <View key={key} style={styles.row}>
                            <Text style={styles.code}>
                              {company === "futuro"
                                ? item.Column2
                                : item.Column1}
                            </Text>
                            <Text style={styles.code}>{item.Column5}$</Text>
                            <Text style={styles.code}>{item.Column6}$</Text>
                          </View>
                        ))}
                      </View>
                    ))
                  )}
                </View>
              </>
            ))}
          </View>
        </View>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
        <Image style={styles.footer} src={footer} fixed />
      </Page>
    </Document>
  );
}

export default Report;
