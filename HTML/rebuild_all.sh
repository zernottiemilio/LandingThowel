#!/bin/bash

echo "🔧 Reconstruyendo TODOS los archivos desde bisagraSoftClosing.html (plantilla funcional)"
echo "=================================================================================="

cd /Users/dev-zernotti/Documents/LandingThowel/HTML

# PistonAGAS.html
echo "📄 Procesando PistonAGAS.html..."
cp bisagraSoftClosing.html PistonAGAS_NEW.html
sed -i '' 's/Bisagra Soft Closing - THOWEL/Pistón a Gas - THOWEL/g' PistonAGAS_NEW.html
sed -i '' 's|/CSS/bisagraSoftClosing.css|/CSS/PistonAGas.css|g' PistonAGAS_NEW.html  
sed -i '' 's|#BisagraSoftClosing|/HTML/bisagraSoftClosing.html|g' PistonAGAS_NEW.html
sed -i '' 's|/HTML/PistonAGAS.html|#PistonAGAS|g' PistonAGAS_NEW.html
sed -i '' 's|/assets/bisagra soft closing/BisagraSoftClosing1.png|/assets/piston a gas/PISTONAGAS.png|g' PistonAGAS_NEW.html
sed -i '' 's|/assets/ambiente.png|/assets/piston a gas/ambientePistonGas.png|g' PistonAGAS_NEW.html
sed -i '' 's|/assets/bisagra soft closing/BisagraSoftClosing2.png|/assets/piston a gas/PISTONAGAS.png|g' PistonAGAS_NEW.html
sed -i '' 's|/assets/TecnologiaSmooth.png|/assets/estandar.png|g' PistonAGAS_NEW.html
sed -i '' 's|BISAGRA<br>SOFT|PISTÓN<br>A GAS|g' PistonAGAS_NEW.html
sed -i '' 's|>CLOSING<|>ESTÁNDAR<|g' PistonAGAS_NEW.html
sed -i '' 's|/assets/bisagra cazoleta estandar/AnguloAperturaBCE.png|/assets/piston a gas/DiagramaTecnicoPistonGas.png|g' PistonAGAS_NEW.html
sed -i '' 's|/assets/bisagra soft closing/TablaSoftClosing.png|/assets/piston a gas/TablaPistonGas.png|g' PistonAGAS_NEW.html
sed -i '' 's|/assets/bisagra soft closing/CodoHorizontal0SoftClosing.png|/assets/piston a gas/CodoPistonGas100mm.png|g' PistonAGAS_NEW.html
sed -i '' 's|/assets/bisagra soft closing/CodoHorizontal9SoftClosing.png|/assets/piston a gas/CodoPistonGas90mm.png|g' PistonAGAS_NEW.html
mv PistonAGAS.html PistonAGAS.html.OLD 2>/dev/null
mv PistonAGAS_NEW.html PistonAGAS.html
echo "✅ PistonAGAS.html completado"

# guiaOculta3DSoftClosing.html
echo "📄 Procesando guiaOculta3DSoftClosing.html..."
cp bisagraSoftClosing.html guiaOculta3DSoftClosing_NEW.html
sed -i '' 's/Bisagra Soft Closing - THOWEL/Guía Oculta 3D Soft Closing - THOWEL/g' guiaOculta3DSoftClosing_NEW.html
sed -i '' 's|/CSS/bisagraSoftClosing.css|/CSS/guiasCorrederas.css|g' guiaOculta3DSoftClosing_NEW.html
sed -i '' 's|#BisagraSoftClosing|/HTML/bisagraSoftClosing.html|g' guiaOculta3DSoftClosing_NEW.html
sed -i '' 's|/HTML/guiaOculta3DSoftClosing.html|#GuiaOculta3D|g' guiaOculta3DSoftClosing_NEW.html
sed -i '' 's|/assets/bisagra soft closing/BisagraSoftClosing1.png|/assets/Guia oculta soft closing/GUIA OCULTA 3D.JPG|g' guiaOculta3DSoftClosing_NEW.html
sed -i '' 's|/assets/ambiente.png|/assets/Guia oculta soft closing/GUIA OCULTA 3D.JPG|g' guiaOculta3DSoftClosing_NEW.html
sed -i '' 's|/assets/bisagra soft closing/BisagraSoftClosing2.png|/assets/Guia oculta soft closing/GUIA OCULTA 3D.JPG|g' guiaOculta3DSoftClosing_NEW.html
sed -i '' 's|BISAGRA<br>SOFT|GUÍA OCULTA<br>3D|g' guiaOculta3DSoftClosing_NEW.html
sed -i '' 's|>CLOSING<|>SOFT CLOSING<|g' guiaOculta3DSoftClosing_NEW.html
mv guiaOculta3DSoftClosing.html guiaOculta3DSoftClosing.html.OLD 2>/dev/null
mv guiaOculta3DSoftClosing_NEW.html guiaOculta3DSoftClosing.html
echo "✅ guiaOculta3DSoftClosing.html completado"

# guiaOcultaPushOpen.html
echo "📄 Procesando guiaOcultaPushOpen.html..."
cp bisagraSoftClosing.html guiaOcultaPushOpen_NEW.html
sed -i '' 's/Bisagra Soft Closing - THOWEL/Guía Oculta Push Open - THOWEL/g' guiaOcultaPushOpen_NEW.html
sed -i '' 's|/CSS/bisagraSoftClosing.css|/CSS/guiasCorrederas.css|g' guiaOcultaPushOpen_NEW.html
sed -i '' 's|#BisagraSoftClosing|/HTML/bisagraSoftClosing.html|g' guiaOcultaPushOpen_NEW.html
sed -i '' 's|/HTML/guiaOcultaPushOpen.html|#GuiaOcultaPushOpen|g' guiaOcultaPushOpen_NEW.html
sed -i '' 's|/assets/bisagra soft closing/BisagraSoftClosing1.png|/assets/Guia oculta push Open/GUIA OCULTA.JPG|g' guiaOcultaPushOpen_NEW.html
sed -i '' 's|/assets/ambiente.png|/assets/Guia oculta push Open/GUIA OCULTA.JPG|g' guiaOcultaPushOpen_NEW.html
sed -i '' 's|/assets/bisagra soft closing/BisagraSoftClosing2.png|/assets/Guia oculta push Open/GUIA OCULTA.JPG|g' guiaOcultaPushOpen_NEW.html
sed -i '' 's|BISAGRA<br>SOFT|GUÍA OCULTA<br>PUSH|g' guiaOcultaPushOpen_NEW.html
sed -i '' 's|>CLOSING<|>OPEN<|g' guiaOcultaPushOpen_NEW.html
mv guiaOcultaPushOpen.html guiaOcultaPushOpen.html.OLD 2>/dev/null
mv guiaOcultaPushOpen_NEW.html guiaOcultaPushOpen.html
echo "✅ guiaOcultaPushOpen.html completado"

echo ""
echo "✅ TODOS LOS ARCHIVOS RECONSTRUIDOS"
echo "===================================="

