import {
  avatarHeight,
  avatarWidth,
  avatarRadius,
  avatarSpace,
  goalWidth,
  cornerRadius,
  borderWidth,
  textBoxMarginLeft,
  textBoxMarginTop,
  fontSizeInt,
  lineSpacing,
  getGoalHeight,
  getLinesForParagraphs,
} from './dimensions'

import { colors } from '../styles'
import { getOrSetImageForUrl } from './imageCache'
import moment from 'moment'

import { iconForHierarchy } from '../components/HierarchyIcon/HierarchyIcon'

function roundRect(ctx, x, y, w, h, radius, color, stroke, strokeWidth) {
  const r = x + w
  const b = y + h

  ctx.beginPath()

  if (stroke) ctx.strokeStyle = color
  else ctx.fillStyle = color

  ctx.lineWidth = stroke ? strokeWidth : '1'
  ctx.moveTo(x + radius, y)
  ctx.lineTo(r - radius, y)
  ctx.quadraticCurveTo(r, y, r, y + radius)
  ctx.lineTo(r, y + h - radius)
  ctx.quadraticCurveTo(r, b, r - radius, b)
  ctx.lineTo(x + radius, b)
  ctx.quadraticCurveTo(x, b, x, b - radius)
  ctx.lineTo(x, y + radius)
  ctx.quadraticCurveTo(x, y, x + radius, y)

  if (stroke) ctx.stroke()
  else ctx.fill()
}

// render a goal card
export default function render(
  goal,
  members,
  { x, y },
  isEditing,
  editText,
  isSelected,
  isHovered,
  ctx
) {
  // use the editText for measuring,
  // even though it's not getting drawn on the canvas
  const text = isEditing ? editText : goal.content
  const goalHeight = getGoalHeight(ctx, text)

  // set up border color
  let borderColor = colors[goal.status]

  let selectedColor = '#5F65FF'

  let backgroundColor = '#FFFFFF'
  if (isHovered) {
    backgroundColor = '#E8E8E8'
  }

  const halfBorder = borderWidth / 2 // for use with 'stroke' of the border
  const twiceBorder = borderWidth * 2

  const selectedOutlineMargin = 1
  const selectedOutlineWidth = '4'

  // display leaf icon for small goal
  // const leafHierarchyIcon = iconForHierarchy(goal.hierarchy)
  if (goal.hierarchy === 'Leaf') {
    const leafImg = getOrSetImageForUrl(
      `img/leaf_${goal.status.toLowerCase()}.svg`,
      30,
      30
    )
    // url, x coordinate, y coordinate, width, height
    if (leafImg) {
      ctx.drawImage(leafImg, x - 24, y - 24, 30, 30)
    }
  }

  // background
  roundRect(
    ctx,
    x + borderWidth,
    y + borderWidth,
    goalWidth - twiceBorder,
    goalHeight - twiceBorder,
    cornerRadius - 1,
    backgroundColor,
    false
  )
  // border
  roundRect(
    ctx,
    x + halfBorder,
    y + halfBorder,
    goalWidth - borderWidth,
    goalHeight - borderWidth,
    cornerRadius,
    borderColor,
    true,
    '2'
  )

  // selection outline
  if (isSelected) {
    let xStart =
      x - selectedOutlineMargin + 1 - halfBorder - selectedOutlineWidth / 2
    let yStart =
      y - selectedOutlineMargin + 1 - halfBorder - selectedOutlineWidth / 2
    let w =
      goalWidth +
      2 * (selectedOutlineMargin - 1) +
      borderWidth +
      Number(selectedOutlineWidth)
    let h =
      goalHeight +
      2 * (selectedOutlineMargin - 1) +
      borderWidth +
      Number(selectedOutlineWidth)
    let cr = cornerRadius + selectedOutlineMargin * 2 + 2
    roundRect(
      ctx,
      xStart,
      yStart,
      w,
      h,
      cr,
      selectedColor,
      true,
      selectedOutlineWidth
    )
  }

  // render text, if not in edit mode
  if (!isEditing) {
    const textBoxLeft = x + textBoxMarginLeft
    const textBoxTop = y + textBoxMarginTop
    const lines = getLinesForParagraphs(ctx, text)
    lines.forEach((line, index) => {
      let linePosition = index * (fontSizeInt + lineSpacing)
      ctx.fillText(line, textBoxLeft, textBoxTop + linePosition)
    })
  }

  if (goal.time_frame) {
    const calendarWidth = 17,
      calendarHeight = 17
    const img = getOrSetImageForUrl(
      'img/calendar.svg',
      calendarWidth,
      calendarHeight
    )
    if (!img) return
    const xImgDraw = x + goalWidth / 2 - calendarWidth - 150
    const yImgDraw = y + goalHeight / 2 - calendarHeight + 51
    const textBoxLeft = xImgDraw + textBoxMarginLeft
    const textBoxTop = yImgDraw + textBoxMarginTop / 4 - 4
    let text = goal.time_frame.from_date
      ? String(moment.unix(goal.time_frame.from_date).format('MMM D, YYYY - '))
      : ''
    text += goal.time_frame.to_date
      ? String(moment.unix(goal.time_frame.to_date).format('MMM D, YYYY'))
      : ''
    ctx.drawImage(img, xImgDraw, yImgDraw, calendarWidth, calendarHeight)
    ctx.save()
    ctx.fillStyle = '#717171'
    ctx.font = '13px rennerbook'
    ctx.fillText(text, textBoxLeft, textBoxTop)
    ctx.restore()
  }

  members.forEach((member, index) => {
    const img = getOrSetImageForUrl(
      member.avatar_url,
      avatarWidth,
      avatarHeight
    )
    // assume that it will be drawn the next time 'render' is called
    // if it isn't already set
    if (!img) return

    // adjust the x position according to the index of this member
    // since there can be many
    const xImgDraw = x + goalWidth - (index + 1) * (avatarWidth + avatarSpace)
    const yImgDraw = y + goalHeight - avatarHeight - avatarSpace

    // help from https://stackoverflow.com/questions/4276048/html5-canvas-fill-circle-with-image
    ctx.save()
    ctx.beginPath()
    ctx.arc(
      xImgDraw + avatarWidth / 2, // x
      yImgDraw + avatarHeight / 2, // y
      avatarRadius, // radius
      0,
      Math.PI * 2,
      true
    )
    ctx.closePath()
    ctx.clip()

    // url, x coordinate, y coordinate, width, height
    ctx.drawImage(img, xImgDraw, yImgDraw, avatarWidth, avatarHeight)

    ctx.beginPath()
    ctx.arc(xImgDraw, yImgDraw, avatarRadius, 0, Math.PI * 2, true)
    ctx.clip()
    ctx.closePath()
    ctx.restore()
  })
}
