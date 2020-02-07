import React from 'react'
import { NavItemsGroup } from '../NavItems/NavItems'
import Icon from '../../Icon/Icon'

const howTosItems = [
  {
    title: 'Cards',
    submenu: [
      {
        title: 'Create a card',
        url: 'create_a_card',
        tab: 'How To',
        description: (
          <ol>
            <li>
              Hold G on keyboard and left click on any empty space on the canvas
            </li>
            <li> Type in a title for the card</li>
            <li>
              {' '}
              Press Enter or click anywhere outside the card to finish creating
              the card
            </li>
          </ol>
        ),
      },
      {
        title: 'Add a child card to an existing card',
        url: 'add_child_card',
        tab: 'How To',
        description: (
          <ol>
            <li>
              Select the existing card that is going to be the parent card
            </li>
            <li>
              {' '}
              While holding G, click anywhere on the empty space in the canvas
            </li>
            <li> Type in the title for the child card</li>
            <li>
              {' '}
              Press Enter or click anywhere outside the card to finish creating
              the child card
            </li>
          </ol>
        ),
      },
      {
        title: 'Select multiple cards',
        url: 'select_multiple_cards',
        tab: 'How To',
        description: (
          <ol>
            <div className='guidebook-separate-line'>Either:</div>
            <li>
              Hold shift and drag your mouse over the cards, then release to
              enter the Multi Edit Mode.
            </li>
            <li>
              {' '}
              Hold shift and left click on the cards that you want to select.
            </li>
          </ol>
        ),
      },
      {
        title: 'Deselect cards',
        url: 'deselect_cards',
        tab: 'How To',
        description: (
          <ol>
            <div className='guidebook-separate-line'>
              To deselect certain selected cards, hold Shift and left click on
              the cards you wish to deselect.
            </div>
            <div className='guidebook-separate-line'>
              To deselect all the cards at once click on an empty space on
              canvas.
            </div>
          </ol>
        ),
      },
      {
        title: 'Title: Change card title',
        url: 'change_card_title',
        tab: 'How To',
        description: (
          <ol>
            <div className='guidebook-separate-line'>
              You can do it in three ways:
            </div>
            <li>
              Double click directly on the title of the card and start typing
              in.
            </li>
            <li>
              {' '}
              After entering the Quick Edit Mode for a card, just start typing
              in.
            </li>
            <li>
              {' '}
              After Entering the Expanded View Mode for the card, just click or
              double click on the title and start typing in. Changes will take
              effect immediately.
            </li>
          </ol>
        ),
      },
      {
        title: 'Status: Change card status',
        url: 'change_card_status',
        tab: 'How To',
        description: (
          <ol>
            <div className='guidebook-description-section'>
              <div className='guidebook-separate-line sub-heading'>
                In Quick Edit Mode
              </div>
              <div className='guidebook-separate-line'>
                Click on “status” button and select the status you want for the
                card.
              </div>
            </div>
            <div className='guidebook-description-section'>
              <div className='guidebook-separate-line sub-heading'>
                In Expanded View Mode
              </div>
              <div className='guidebook-separate-line'>
                Click on the Hierarchy icon on top left corner of the expanded
                card which matches the color of card status. Click on the status
                color that you want for the card.
              </div>
            </div>
            <div className='guidebook-description-section'>
              <div className='guidebook-separate-line sub-heading'>
                In Multi Edit Mode
              </div>
              <div className='guidebook-separate-line'>
                Click on the Squirrels icon from the Multi Edit Bar and select
                the members that you want to associate with the card from the
                list.
              </div>
            </div>
          </ol>
        ),
      },
      {
        title: 'Squirrels: Associate members with cards',
        url: 'associate_members_with_cards',
        tab: 'How To',
        description: (
          <ol>
            <div className='guidebook-description-section'>
              <div className='guidebook-separate-line sub-heading'>
                In Quick Edit Mode
              </div>
              <div className='guidebook-separate-line'>
                Click on “squirrels” button and select the members that you want
                to associate with the card from the list.
              </div>
            </div>
            <div className='guidebook-description-section'>
              <div className='guidebook-separate-line sub-heading'>
                In Expanded View Mode
              </div>
              <div className='guidebook-separate-line'>Either:</div>
              <li>
                Hold shift and drag your mouse over the cards, then release to
                enter the Multi Edit Mode.
              </li>
              <li>
                {' '}
                Hold shift and left click on the cards that you want to select.
              </li>
            </div>
            {/* TODO: show this when multi-editing gets added for squirrels */}
            {/* <div className='guidebook-description-section'>
              <div className='guidebook-separate-line sub-heading'>
                In Multi Edit Mode
              </div>
              <div className='guidebook-separate-line'>
                Click on the Squirrels icon from the Multi Edit Bar and select
                the members that you want to associate with the card from the
                list.
              </div>
              <div className='guidebook-separate-line'>
                If wanting to associate certain members with multiple cards at
                once, you can do so in Multi Edit Mode after selecting the cards
                all together. Please note, this function will override all the
                existing settings for the associate members in all of the
                selected cards.
              </div>
            </div> */}
          </ol>
        ),
      },
      {
        title: 'Timeframe: Add or edit timeframe of cards',
        url: 'edit_timeframe_of_cards',
        tab: 'How To',
        description: (
          <ol>
            <div className='guidebook-description-section'>
              <div className='guidebook-separate-line sub-heading'>
                In Quick Edit Mode
              </div>
              <div className='guidebook-separate-line'>
                Click on “timeframe” button and select or type in Start Date and
                End Date.
              </div>
            </div>
            <div className='guidebook-description-section'>
              <div className='guidebook-separate-line sub-heading'>
                In Expanded View Mode
              </div>
              <div className='guidebook-separate-line'>Either:</div>
              <li>
                Click on the grey field under “timeframe” and select or type in
                Start Date and End Date.
              </li>
              <li>
                {' '}
                Click on the Calendar icon on the Right Menu and select or type
                in Start Date and End Date.
              </li>
            </div>
            <div className='guidebook-description-section'>
              <div className='guidebook-separate-line sub-heading'>
                In Multi Edit Mode
              </div>
              <div className='guidebook-separate-line'>
                Click on the Calendar icon from the Multi Edit Bar and select or
                type in Start Date and End Date. Please note, this function will
                override all the existing settings for timeframe in all of the
                selected cards.
              </div>
            </div>
          </ol>
        ),
      },
      {
        title: 'Hierarchy: Set hierarchy level of cards',
        url: 'set_hierarchy_level_of_cards',
        tab: 'How To',
        description: (
          <ol>
            <div className='guidebook-description-section'>
              <div className='guidebook-separate-line sub-heading'>
                In Quick Edit Mode
              </div>
              <div className='guidebook-separate-line'>
                Click on "hierarchy" button and select the "hierarchy" level
                that you want.
              </div>
            </div>
            <div className='guidebook-description-section'>
              <div className='guidebook-separate-line sub-heading'>
                In Expanded View Mode
              </div>
              <div className='guidebook-separate-line'>Either:</div>
              <div className='guidebook-separate-line'>
                Click on the Hierarchy icon on the Right Menu.
              </div>
            </div>
            <div className='guidebook-description-section'>
              <div className='guidebook-separate-line sub-heading'>
                In Multi Edit Mode
              </div>
              <div className='guidebook-separate-line'>
                Click on the Hierarchy icon from the Multi Edit Bar. Please
                note, this function will override all the existing settings for
                hierarchy in all of the selected cards.
              </div>
            </div>
          </ol>
        ),
      },
      {
        title: 'Priority: See aggregated priority of a card',
        url: 'setting_hierarchy_of_cards',
        tab: 'How To',
        description: (
          <ol>
            <div className='guidebook-description-section'>
              <div className='guidebook-separate-line sub-heading'>
                In Quick Edit Mode
              </div>
              <div className='guidebook-separate-line'>
                Click on “priority” button. You will be able to see the
                aggregated votes for 4 factors that determine priority of the
                card. For more information on how the prioritization system
                works in Acorn see Prioritization.
              </div>
            </div>
            <div className='guidebook-description-section'>
              <div className='guidebook-separate-line sub-heading'>
                In Expanded View Mode
              </div>
              <div className='guidebook-separate-line'>Either:</div>
              <li>
                Click on priority tab on Expanded View Navbar under the
                description field.
              </li>
              <li>Click on the Priority icon on the Right Menu</li>
            </div>
            <div className='guidebook-description-section'>
              <div className='guidebook-separate-line sub-heading'>
                In Multi Edit Mode
              </div>
              <div className='guidebook-separate-line'>
                Click on the Hierarchy icon from the Multi Edit Bar. Please
                note, this function will override all the existing settings for
                hierarchy in all of the selected cards.
              </div>
            </div>
          </ol>
        ),
      },
      {
        title: 'Priority: Vote for priority of a card',
        url: 'vote_for_priority_of_a_card',
        tab: 'How To',
        description: (
          <ol>
            <div className='guidebook-description-section'>
              <div className='guidebook-separate-line sub-heading'>
                In Quick Edit Mode
              </div>
              <div className='guidebook-separate-line'>
                Click on “priority” button. Then click on the "Weigh In" button.
                The default vote is “medium” for all 4 factors. You can slide
                the factor bars to set your own. For more information about
                prioritization go to Priority View Mode.
              </div>
            </div>
            <div className='guidebook-description-section'>
              <div className='guidebook-separate-line sub-heading'>
                In Expanded View Mode
              </div>
              <div className='guidebook-separate-line'>
                Click on “priority” button. Then click on the "Weigh In" button.
                The default vote is “medium” for all 4 factors. You can slide
                the factor bars to set your own. For more information about
                prioritization go to Priority View Mode.
              </div>
            </div>
            <div className='guidebook-description-section'>
              <div className='guidebook-separate-line sub-heading'>
                In Multi Edit Mode
              </div>
              <div className='guidebook-separate-line'>
                Click on the Priority icon from the Multi Edit Bar. Then Click
                on the "Weigh In" button.
              </div>
            </div>
          </ol>
        ),
      },
      // TODO: enable this section when the multi view location gets built-in
      // {
      //   title: 'Locate a goal in different view modes',
      //   url: 'locate_a_goal_in_different_view_modes',
      //   tab: 'How To',
      //   description: (
      //     <ol>
      //       <div className='guidebook-description-section'>
      //         The view mode buttons will make it easier for you to locate
      //         certain goals in different view modes. In priority view, these
      //         button appear when hovering on a certain goal (map and timeline).
      //         Vice versa, if you are on the map view mode, to locate a specific
      //         goal in priority view, open the priority pop-up for that goal, and
      //         click on the icon at the bottom of the pop-up.
      //       </div>
      //     </ol>
      //   ),
      // },
    ],
  },

  {
    title: 'Navigation',
    submenu: [
      {
        title: 'Pan around in Map View Mode',
        url: 'pan_around',
        tab: 'How To',
        description: (
          <ol>
            <div className='guidebook-description-section'>
              <div className='guidebook-separate-line sub-heading'>
                Trackpad
              </div>
              <div className='guidebook-separate-line'>
                Scroll the map in any direction by sliding two fingers on the
                trackpad
              </div>
            </div>
            <div className='guidebook-description-section'>
              <div className='guidebook-separate-line sub-heading'>
                Mouse or trackpad
              </div>
              <div className='guidebook-separate-line'>
                Click and drag the canvas to pan around
              </div>
            </div>
            {/* <div className='guidebook-description-section'>
              <div className='guidebook-separate-line sub-heading'>
              Keyboard
              </div>
              <div className='guidebook-separate-line'>
              Use arrow keys to move vertically or horizontally though the canvas
              </div>
            </div> */}
          </ol>
        ),
      },
      {
        title: 'Zoom in and out in Map View Mode',
        url: 'zooming_in_and_out',
        tab: 'How To',
        description: (
          <ol>
            <div className='guidebook-description-section'>
              <div className='guidebook-separate-line sub-heading'>
                Trackpad
              </div>
              <div className='guidebook-separate-line'>
                Zoom by pinching in and out
              </div>
            </div>
            <div className='guidebook-description-section'>
              <div className='guidebook-separate-line sub-heading'>Mouse</div>
              <div className='guidebook-separate-line'>
                {/* Use the mouse wheel while holding Ctrl/Cmd to zoom in and out */}
                Click on the "-" and "+" icons on Map View Mode. They are
                located at the bottom right corner of the Map View Mode.
              </div>
            </div>
            <div className='guidebook-description-section'>
              <div className='guidebook-separate-line sub-heading'>
                Current Zoom
              </div>
              <div className='guidebook-separate-line'>
                The number next to the "-" and "+" icons in the bottom right
                corner of the Map View Mode represents the current level of
                zoom.
              </div>
            </div>
            {/* <div className='guidebook-description-section'>
              <div className='guidebook-separate-line sub-heading'>
              Keyboard
              </div>
              <div className='guidebook-separate-line'>
              Use + and - keys to zoom in and out.
              </div>
            </div> */}
          </ol>
        ),
      },
      {
        title: 'Switch between Map & Priority View modes',
        url: 'switch_between_view_modes',
        tab: 'How To',
        description: (
          <ol>
            <div className='guidebook-description-section'>
              <div className='guidebook-separate-line sub-heading'>
                General View Mode Switching
              </div>
              <div className='guidebook-separate-line'>
                Use the Priority Icon and Map View icon on bottom right corner
                of the screen to switch between the two views.
              </div>
            </div>
            {/* TODO: show this instruction when the locate card on view mode gets built */}
            {/* <div className='guidebook-description-section'>
              <div className='guidebook-separate-line sub-heading'>
                Locating a specific card in a different view mode
              </div>
              <div className='guidebook-separate-line'>
                You can also locate a selected goal card from the map view on
                priority view by selecting on the priority view icon in priority
                pop-up, and vice versa: you can locate a selected card on
                priority view to the Map view.
              </div>
            </div> */}
          </ol>
        ),
      },
    ],
  },

  {
    title: 'Priority View Mode',
    submenu: [
      {
        title: 'Introduction to Priority View Mode',
        url: 'introduction_to_priority_view_mode',
        tab: 'Getting Started',
        description: (
          <ol>
            <div className='guidebook-description-section'>
              <div className='guidebook-separate-line'>
                Priority View Mode is an alternative view mode to the Map View
                Mode, specifically designed for helping you and your team with
                decision making on priority of the goals that you set on the
                map. For determining the priority of goals we have allocated 4
                factors:
                <div className='guidebook-description-bold'>Urgency</div>
                <div className='guidebook-description-bold'>Importance</div>
                <div className='guidebook-description-bold'>Effort</div>
                <div className='guidebook-description-bold'>Impact</div>
              </div>
            </div>
            <div className='guidebook-description-section'>
              <div className='guidebook-separate-line'>
                The{' '}
                <text className='guidebook-description-bold'>
                  urgency-importance
                </text>{' '}
                integration is inspired from a principle called Eisenhower
                Matrix.
              </div>
              <div className='guidebook-separate-line'>
                The{' '}
                <text className='guidebook-description-bold'>
                  effort-impact
                </text>{' '}
                integration is another way of prioritizing goals.{' '}
                <a href='https://zapier.com/blog/how-to-prioritize/'>
                  “In the effort-impact matrix, you evaluate tasks based on how
                  much effort they’ll require to complete and the impact that
                  completing them will have.”
                </a>
                The items in the left quadrants, which are both "More Impact",
                are where you would start to work on tasks from, depending on
                whether you are prepared for low or high effort.
              </div>
              <div className='guidebook-separate-line'>
                In complex projects as the number of goals (and sometimes number
                of team members) expands, it gets more difficult to determine
                ‘what to focus on next’.
              </div>
              <div className='guidebook-separate-line'>
                All the team members (who have editing permssion) would be able
                to “weigh in” their vote for these 4 factors for each goal
                (either in map view or priority view) The “aggregated priority”
                that results from this collective poll will determine where each
                goal will stand on the priority view mode.
              </div>
              <div className='guidebook-separate-line guidebook-description-bold'>
                If you have a diverse team and not sure if everyone is having a
                shared understing of what each of these priority factors mean,
                we recommend having an onboarding meeting/session with your team
                members to develop a shared understing of each factor in the
                context of the project you are working on.
              </div>
            </div>
          </ol>
        ),
      },
      {
        title: 'Indented Tree View',
        url: 'indented_tree_view',
        tab: 'Getting Started',
        description: (
          <ol>
            <div className='guidebook-description-section'>
              This column on the left side of Priority view page helps you with
              finding and filtering by a specific goal. By selecting that goal
              you would be able to filter the visiblity of the goals down to
              only the childern of that selected goal on the priority quadrants.
            </div>
          </ol>
        ),
      },
      {
        title: 'Priority Metrics tabs',
        url: 'priority_metrics_tabs',
        tab: 'Getting Started',
        description: (
          <ol>
            <div className='guidebook-description-section'>
              These tabs help you switch between priority matrixes (urgency x
              important and impact x effort), single priority factors (feature
              in developement), or uncategorized (not voted on) goals. This
              gives you the flexibility to take action based on a specific
              factor determining a goal’s priority.
            </div>
          </ol>
        ),
      },
      {
        title: 'Weign In and See My Vote buttons',
        url: 'weigh_in_and_see_my_votes_buttons',
        tab: 'Getting Started',
        description: (
          <ol>
            <div className='guidebook-description-section'>
              If you haven’t voted for the priority of the goal, When hovering
              over goals in the priority view, “Weigh In” button apprears.
            </div>
            <div className='guidebook-description-section'>
              If you have already voted for the priority of a goal, a purple dot
              shows up under the goal title and when hovering on the goal, “See
              My Vote” button appears.
            </div>
          </ol>
        ),
      },
    ],
  },
]

// component
const Content = ({ goBack, title, description }) => (
  <div className='guidebook-section'>
    <div className='nav-item'>
      <Icon
        name='back_717171.svg'
        size='very-small'
        className='grey'
        onClick={goBack}
      />
      <div className='guidebook-section-title'>{title}</div>
    </div>
    <div className='guidebook-section-description'>{description}</div>
  </div>
)

export default function HowTos({ sectionSelected, goBack, selectSection }) {
  if (sectionSelected) {
    return (
      <Content
        goBack={goBack}
        title={sectionSelected.title}
        description={sectionSelected.description}
      />
    )
  }
  return <NavItemsGroup items={howTosItems} selectSection={selectSection} />
}
