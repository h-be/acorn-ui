
  function SelectBox(ctx, x, y, w, h,) {
    ctx.beginPath()
        ctx.strokeStyle="#5F65FF"
        ctx.moveTo(x,y)
        ctx.lineTo(x+w,y)
        ctx.lineTo(x+w,y+h)
        ctx.lineTo(x,y+h)
        ctx.lineTo(x,y)
        ctx.closePath()
        ctx.stroke()
  }
  
  // render a goal card
  export default function render({x,y},{w,h} , ctx) {
    SelectBox(ctx,x,y,w,h)
  }