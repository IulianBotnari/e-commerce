import adminStyle from '../admin_pages/AdminPage.module.scss'


export default function AdminPage() {


    return <>
        <h1>Admin Page</h1>
        <form>
            <label>Categoria</label>
            <select name={"Seleziona categoria"}>
                <option>Seleziona</option>
                <optgroup label={'Computer Tablet NoteBook'}>
                    <option>Accessori Apple</option>
                    <option>Accesori Tablet</option>
                    <option>Computer</option>
                    <option>NoteBook Rigenerati</option>
                    <option>WorkStation e Server</option>
                    <option>Accessori Desktop</option>
                    <option>App</option>
                    <option>Microsoft Surface</option>
                    <option>Tablet</option>
                    <option>Accessori NoteBook</option>
                    <option>Borse, Zaini, etc</option>
                    <option>NoteBook</option>
                </optgroup>
                <optgroup label={'Consumabile Accessori'}>
                    <option>Cavi</option>
                    <option>Power Bank</option>
                    <option>Accessori iPhone</option>
                    <option>Accessori Samsung</option>
                    <option>Pendrive USB</option>
                    <option>Consumabile</option>
                    <option>Accessori Apple</option>
                    <option>Accessori Mobile</option>
                    <option>Accesori Tablet</option>
                    <option>Sedie Gaming</option>
                    <option>Multiprese</option>
                    <option>Accessori Asus</option>
                    <option>Accessori NoteBook</option>
                    <option>Case Accesori</option>
                </optgroup>
                <optgroup label='Hardware e Software'>
                    <option>Alimentatori</option>
                    <option>Case Accessori</option>
                    <option>Dissipatore CPU</option>
                    <option>Masterizzatori</option>
                    <option>Rack Case</option>
                    <option>Software Antivirus</option>
                    <option>Networking</option>
                    <option>Webcam</option>
                    <option>Card Reader, Hub</option>
                    <option>Controller Raid</option>
                    <option>Hard Disk e SSD</option>
                    <option>Memorie Flash</option>
                    <option>Schede I/O</option>
                    <option>Water Cooling</option>
                    <option>Router</option>
                    <option>Case</option>
                    <option>CPU</option>
                    <option>Schede Video</option>
                    <option>Memorie Ram</option>
                    <option>Main Board</option>
                    <option>Windows e Office</option>
                    <option>UPS</option>
                </optgroup>
                <optgroup label={'Monitor Stampanti Periferiche'}>
                    <option>Gaming Chair</option>
                    <option>NAS</option>
                    <option>Stampanti/Scanner</option>
                    <option>Ufficio</option>
                    <option>Cuffie</option>
                    <option>Monitor</option>
                    <option>Tastiere</option>
                    <option>UPS</option>
                    <option>Videosorveglianza</option>
                    <option>Mouse</option>
                    <option>Periferiche Gaming</option>
                    <option>Tavoletta Grafica</option>
                    <option>Webcam</option>
                </optgroup>

            </select>
        </form>

    </>
}