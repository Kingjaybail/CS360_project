# This is where we will create our logger theyre cool you can customize alot of biz here

# importing module
import logging

# Create and configure logger
logging.basicConfig(filename="./CS360_project_backend/newfile.log",
                    format='%(asctime)s %(message)s',
                    filemode='w')

# Creating an object
logger = logging.getLogger()

# Setting the threshold of logger to DEBUG
logger.setLevel(logging.DEBUG)

logger.info("Info message")