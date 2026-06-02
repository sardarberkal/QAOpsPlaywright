Feature: Ecommerce validations
    @Regression
    Scenario: Placing the order
     Given a login to Ecommerce application with valid credentials
     When add  "ZARA COAT 3" to cart
     Then  verify "ZARA COAT 3" is displayed on Cart Page
     When enter valid details and place the order
     Then verify order is present on Order History Page


 @Validation
    Scenario Outline: Placing the order
     Given a login to Ecommerce2 application with "<userName>" and "<password>"
     Then verify error message is displayed
     Examples:
     | userName   | password    |
     | saradr     | password123 |
     | Priyanka   | password 999|