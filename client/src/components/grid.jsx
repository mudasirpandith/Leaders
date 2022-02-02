import React from "react";

import Box from "@mui/material/Box";

import Grid from "@mui/material/Grid";
import MultiActionAreaCard from "./card";
import ChemistryFull from "../images/chemistryfull.jpg";
import PhysicsFull from "../images/physicsfull.jpg";
import BiologyFull from "../images/biologyfull.jpg";
export default function CustomGrid() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid div xs={12} sm={4}>
            <div className="subjectBox">
              {" "}
              <MultiActionAreaCard
                link="/test/biology"
                image={BiologyFull}
                subject="Biology"
              />{" "}
            </div>
          </Grid>
          <Grid div xs={12} sm={4}>
            <div className="subjectBox">
              <MultiActionAreaCard
                link="/test/physics"
                image={PhysicsFull}
                subject="Physics"
              />
            </div>
          </Grid>
          <Grid div xs={12} sm={4}>
            <div className="subjectBox">
              <MultiActionAreaCard
                link="/test/chemistry"
                image={ChemistryFull}
                subject="Chemistry"
              />
            </div>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
