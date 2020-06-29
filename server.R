server <- function(input, output, session) {
  live_comment <- read.table("data/comments.csv", header = T, sep = ",") 
  tbl <- reactiveValues(cmt = live_comment)
  
  # output$comment_id <- DT::renderDT({
  #   DT::datatable(tbl$cmt, extensions = "FixedColumns",
  #             options=list(
  #               paging=F,
  #               scrollX=T,
  #               # scrollY='70vh',
  #               dom='t',
  #               lengthChange = F,
  #               ordering=F,
  #               fixedColumns=list(leftColumns=1)
  #             ),
  #             rownames=F
  #   )
  # })
  
  output$comment_id <- renderTable({
    tbl$cmt
  }, spacing = 'l', align = 'l', width = "75%")
  
  observeEvent(input$sendActionButton, {
    live_comment <- tbl$cmt
    Nama <- input$namesTextInput
    Ucapan <- input$wishesTextAreaInput
    livenew <- data.frame(Nama, Ucapan)
    
    updateTextInput(session, "namesTextInput", value = "")
    updateTextAreaInput(session, "wishesTextAreaInput", value = "")

    
    live_ <- rbind(live_comment, livenew)
    tbl$cmt <- live_
    
    write.table(live_, "data/comments.csv", quote=FALSE, row.names=FALSE, sep = ",")
  })
  
}