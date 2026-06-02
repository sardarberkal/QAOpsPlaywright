Feature: Ecommerce validations
    @Validation
    Scenario Outline: Placing the order
     Given a login to Ecommerce2 application with "<userName>" and "<password>"
     Then verify error message is displayed
     Examples:
     | userName   | password    |
     | saradr     | password123 |
     | Priyanka   | password 999|