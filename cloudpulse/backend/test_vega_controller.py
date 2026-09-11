from app.services.vega_controller import vega_controller

print("Testing VEGA Aries V2...")
print()

result = vega_controller.evaluate_reclamation(
    cpu=1.4,
    network=2.1,
    sockets=0,
    iops=1,
    memory=18
)

print("VEGA RESULT:")
print(result)