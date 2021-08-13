import React from "react";
import styled from "styled-components";

import { Card } from "./Card";
import StukWithBackground from "../assets/img/stuk.png";
import Uk from "../assets/img/uk_logo.png";

const Text = styled.p`
  font-size: 0.5rem;
  margin-top: 0;
  margin-bottom: 0.25rem;
`;

const CardBlackBar = styled.div`
  background: #383838;
  width: 100%;
  height: 4rem;
  margin-top: 2rem;
`;

export const BackCard = ({ student, setStudent }) => {
  return (
    <Card isBackOfCard>
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardBlackBar />
        <div style={{ padding: "0 0.75rem 0 0.75rem" }}>
          <div style={{ marginTop: "1rem" }}>
            <Text
              style={{
                fontSize: "1rem",
                textAlign: "center",
                marginBottom: "0.5rem",
              }}
            >
              Alla studentrabatter hittar du på studentkortet.se eller i
              Studentkortets app
            </Text>
            <Text>
              Detta kort är ett bevis på betald medlemsavgift till studentnation
              och/eller studentkår vid Uppsala universitet, och gäller
              tillsammans med giltig fotolegitimation som studentlegitimation i
              Uppsala. Missbruk av kortet beivras. The holder od this card is a
              student in Uppsala and the card is a proof of membership in a
              student nation and/or a student union. It is a valid as a student
              ID in Uppsala
            </Text>
            <Text style={{ textAlign: "center" }}>
              togheter with a photo ID.
            </Text>
            {/* <Text style={{fontSize: "1rem"}}>Alla studentrabatter hittar du på studentkortet.se eller i Studentkortets app</Text>
						<Text>Detta kort är ett bevis på betald medlemsavgift till studentnation och/eller studentkår vid Uppsala</Text>
						<Text>universitet, och gäller tillsammans med giltig fotolegitimation som studentlegitimation i Uppsala.</Text>
						<Text>Missbruk av kortet beivras. The holder od this card is a student in Uppsala and the card is a proof of</Text>
						<Text>membership in a student nation and/or a student union. It is a valid as a student ID in Uppsala</Text>
						<Text>togheter with a photo ID.</Text> */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                alt="hello"
                style={{ maxWidth: 100 }}
                src={StukWithBackground}
              />
            </div>
          </div>
        </div>
        <hr style={{ border: "1px solid black", width: "100%" }} />
        <p
          style={{
            marginTop: "0.25rem",
            fontSize: "0.75rem",
            textAlign: "center",
          }}
        >
          STUDENT IDENTITY CARD
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "end",
            marginTop: "1rem",
          }}
        >
          <p style={{ fontSize: "1.3rem" }}>Kår- och nationsföretag:</p>
          <img
            alt="lmao"
            src={Uk}
            style={{ maxWidth: "150px", marginRight: "2rem" }}
          />
          {/* <div style={{ background: "black", width: 50, height: 50 }} /> */}
        </div>
      </div>
    </Card>
  );
};
