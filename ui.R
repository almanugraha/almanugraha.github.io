htmlTemplate(
  filename = "www/index.html",
  names = textInput("namesTextInput", "Nama", placeholder = "Nama", width = "50%"),
  wishes = textAreaInput("wishesTextAreaInput", "Ucapan", placeholder="Ucapan dan Doa", width = "90%"),
  send = actionButton("sendActionButton", "Kirim"),
  # comment_id = DT::DTOutput("comment_id")
  comment_id = tableOutput("comment_id")
)
