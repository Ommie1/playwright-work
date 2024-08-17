Feature: User registration test cases

  # The first example has two steps
  Scenario: User registration happy flow
    Given User is able to register on site
    When user goes to registration page
    Then user enters all the information
    And user redirects to admin page
