// import * as React from "react";
// import PropTypes from "prop-types";
// import LinearProgress from "@mui/material/LinearProgress";
// import Typography from "@mui/material/Typography";
// import Box from "@mui/material/Box";

// function LinearProgressWithLabel({ value }) {
//   return (
//     <Box style={{ display: "flex", alignItems: "center" }}>
//       <Box style={{ width: "100%", mr: 1 }}>
//         <LinearProgress variant="determinate" value={value} />
//       </Box>
//       <Box style={{ minWidth: 35 }}>
//         <Typography variant="body2" color="text.secondary">{`${Math.round(
//           value
//         )}%`}</Typography>
//       </Box>
//     </Box>
//   );
// }

// LinearProgressWithLabel.propTypes = {
//   value: PropTypes.number.isRequired,
// };

// export default function LinearWithValueLabel({ value }) {
//   return (
//     <Box>
//       <LinearProgressWithLabel value={value} />
//     </Box>
//   );
// }

import * as React from "react";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function LinearProgressWithLabel({ value }) {
  const displayValue = isNaN(value) ? 0 : value; // NaN인 경우 0으로 처리
  return (
    <Box style={{ display: "flex", alignItems: "center" }}>
      <Box style={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" value={displayValue} />
      </Box>
      <Box style={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          displayValue
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function LinearWithValueLabel({ value }) {
  return (
    <Box>
      <LinearProgressWithLabel value={value} />
    </Box>
  );
}
