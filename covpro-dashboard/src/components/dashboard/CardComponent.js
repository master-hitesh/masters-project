import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardHeader,
  Avatar,
  Divider,
  Dialog,
  DialogActions,
  DialogTitle,
  List,
  ListItemText,
  ListItemButton,
  DialogContent,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { lightGreen, orange, red, brown } from "@mui/material/colors";
import male from "../../assets/male.png";
import female from "../../assets/female.png";
import { postapi, getapi } from "../../services/webservices";
import moment from "moment";

function CardComponent({ patient, refreshDashboard }) {
  const [openVerifyDialog, setOpenVerifyDialog] = useState(false),
    [openAssignDialog, setOpenAssignDialog] = useState(false),
    [openChatDialog, setOpenChatDialog] = useState(false),
    [selectedIndex, setSelectedIndex] = useState(0),
    [hospitalList, setHospitalList] = useState([]),
    [reply, setReply] = useState("");

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const handleVerifyOpen = () => {
    setOpenVerifyDialog(true);
  };

  const handleClose = () => {
    setOpenVerifyDialog(false);
    setOpenAssignDialog(false);
    setOpenChatDialog(false);
  };

  const handleAgree = async () => {
    setOpenVerifyDialog(false);
    await postapi("user/verifyUser", { id: patient._id });
    alert("Patient successfully verified!");
    refreshDashboard();
  };

  const handleSend = async () => {
    setOpenChatDialog(false);
    await postapi("user/addComment", {
      id: patient._id,
      comment: "Admin : " + reply,
    });
    alert("Message sent!");
    setReply("");
    refreshDashboard();
  };

  const handleAssign = () => {
    setOpenAssignDialog(false);
    postapi("user/assignHospital", {
      id: patient._id,
      hospital: hospitalList?.rows[selectedIndex].doc.name,
    }).then((data) => {
      if (data) {
        postapi("hospital/updateBedCount", {
          id: hospitalList?.rows[selectedIndex].doc._id,
        }).then((data) => {
          alert("Bed assigned to patient successfully!");
          refreshDashboard();
        });
      }
    });
  };

  const handleAssignOpen = async () => {
    if (patient.hospital !== "NA") {
      alert(`Bed already assigned to patient at ` + patient.hospital);
      return;
    }
    if (patient.profileStatus === "Verified") {
      let data = await getapi("hospital/getAllHospitals");
      setHospitalList(data);
      setOpenAssignDialog(true);
    } else {
      alert("Patient verification pending!");
    }
  };

  const handleChatOpen = async () => {
    setOpenChatDialog(true);
  };

  return (
    <div>
      {/* Patient details card */}
      <Card sx={{ width: 350, height: 350 }}>
        <CardHeader
          sx={
            patient.patientScore < 60
              ? patient.patientScore < 40
                ? { bgcolor: lightGreen[300] }
                : { bgcolor: orange[300] }
              : { bgcolor: red[200] }
          }
          avatar={
            patient.gender === "Male" ? (
              <Avatar alt="male" src={male} />
            ) : (
              <Avatar alt="female" src={female} />
            )
          }
          action={
            patient.profileStatus === "Verified" ? (
              <Button size="small" variant="outlined" disabled>
                Verified
              </Button>
            ) : (
              <Button
                size="small"
                variant="outlined"
                onClick={handleVerifyOpen}
              >
                Verify
              </Button>
            )
          }
          title={patient.name}
          subheader={patient.specimenId}
        />
        <CardContent sx={{ width: 320, height: 200, bgcolor: brown[50] }}>
          <Typography
            sx={{ fontSize: 12, fontWeight: "bold" }}
            color="text.secondary"
            gutterBottom
          >
            AGE : {patient.age}
          </Typography>
          <Typography
            sx={{ fontSize: 12, fontWeight: "bold" }}
            color="text.secondary"
            gutterBottom
          >
            MOBILE : {patient.mobileno}
          </Typography>
          <Typography
            sx={{ fontSize: 12, fontWeight: "bold" }}
            color="text.secondary"
            gutterBottom
          >
            PIN CODE : {patient.location}
          </Typography>
          <Typography
            sx={{ fontSize: 12, fontWeight: "bold" }}
            color="text.secondary"
            gutterBottom
          >
            HOSPITAL : {patient.hospital}
          </Typography>
          <Divider variant="fullWidth" sx={{ marginTop: 1, marginBottom: 2 }} />
          <Typography
            sx={{ fontSize: 10, fontWeight: "bold" }}
            color="text.secondary"
            gutterBottom
          >
            SpO2 LEVEL : {patient.healthData.oxygen}
          </Typography>
          <Typography
            sx={{ fontSize: 10, fontWeight: "bold" }}
            color="text.secondary"
            gutterBottom
          >
            TEMP : {patient.healthData.temp}
          </Typography>
          <Typography
            sx={{ fontSize: 10, fontWeight: "bold" }}
            color="text.secondary"
            gutterBottom
          >
            HEART RATE : {patient.healthData.heartRate}
          </Typography>
          <Typography
            sx={{ fontSize: 10, fontWeight: "bold" }}
            color="text.secondary"
            gutterBottom
          >
            SYMPTOM : {patient.healthData.symptom}
          </Typography>
          <Typography
            sx={{ fontSize: 10, fontWeight: "bold" }}
            color="text.secondary"
            gutterBottom
          >
            COMORBIDITY : {patient.healthData.comorbidity}
          </Typography>
        </CardContent>
        <CardActions
          sx={
            patient.patientScore < 60
              ? patient.patientScore < 40
                ? { bgcolor: lightGreen[300] }
                : { bgcolor: orange[300] }
              : { bgcolor: red[200] }
          }
        >
          <Button size="small" variant="outlined" onClick={handleChatOpen}>
            Chat
          </Button>
          {patient.patientScore >= 40 && (
            <Button size="small" variant="outlined" onClick={handleAssignOpen}>
              Assign Bed
            </Button>
          )}
        </CardActions>
      </Card>

      {/* Verify patient dialog */}
      <Dialog open={openVerifyDialog} onClose={handleClose}>
        <DialogTitle>
          Do you want to mark patient "{patient.name}" as verified ?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleAgree} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      {/* Assign hospital dialog */}
      <Dialog onClose={handleClose} open={openAssignDialog}>
        <DialogTitle>Select COVID Hospital</DialogTitle>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {hospitalList?.rows?.map((hospital, index) => (
            <ListItemButton
              sx={{
                border: 1,
                borderColor: brown[100],
                color: "primary.main",
              }}
              key={hospital.doc._id}
              divider
              selected={selectedIndex === index}
              onClick={(event) => handleListItemClick(event, index)}
            >
              <ListItemText
                primary={hospital.doc.name}
                secondary={"Total beds available: " + hospital.doc.bedCount}
              />
            </ListItemButton>
          ))}
        </List>
        <DialogActions>
          <Button
            autoFocus
            size="small"
            variant="contained"
            onClick={handleAssign}
          >
            Assign
          </Button>
        </DialogActions>
      </Dialog>

      {/* Chat dialog */}
      <Dialog open={openChatDialog} onClose={handleClose}>
        <DialogTitle>Messages</DialogTitle>
        <DialogContent>
          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
              marginBottom: 5,
            }}
          >
            {patient?.chat.map((chat, index) => (
              <ListItemButton
                sx={{
                  border: 1,
                  borderColor: brown[100],
                  color: "primary.main",
                }}
                key={chat.timestamp}
                divider
              >
                <ListItemText
                  primary={chat.comment}
                  secondary={moment.unix(chat.timestamp / 1000).format("LLL")}
                />
              </ListItemButton>
            ))}
          </List>
          <TextField
            autoFocus
            variant="standard"
            margin="dense"
            placeholder="Enter your message here..."
            fullWidth
            size="small"
            value={reply}
            onChange={(event) => setReply(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            size="small"
            variant="contained"
            onClick={handleSend}
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CardComponent;
